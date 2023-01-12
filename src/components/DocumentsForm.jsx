import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useColorModeValue,
  useSafeLayoutEffect
} from '@chakra-ui/react';
import axios from 'axios';
import { Select } from 'chakra-react-select';
import { State } from 'country-state-city';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Carousel from './Carousel';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

import { AuthContext } from '..';
const DocumentsForm = () => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigator = useNavigate();

  const addDocuments = (event) => {
    event.preventDefault();
    const documents = [];

    const addImages = new Promise((resolve, reject) => {
      images.forEach((img, index, array) => {
        axios
          .post(
            'http://10.0.2.2:8086/api/v1/documents',
            {
              path: img
            },
            {
              headers: {
                Authorization: `Basic ${user}`,
                'content-type': 'application/json'
              }
            }
          )
          .then((d) => {
            console.log(d.data['_links'].self.href);
            documents.push(d.data['_links'].self.href);
            if (index === array.length - 1) resolve();
          });
      });
    });
    addImages.then(() => {
      console.log(documents.join('\r\n'));
      axios
        .patch(
          `http://10.0.2.2:8086/api/v1/demandes/${id}/documents`,
          documents.join('\r\n'),
          {
            headers: {
              Authorization: `Basic ${user}`,
              'Content-Type': 'text/uri-list'
            }
          }
        )
        .then((d) => {
          console.log(d);
          navigator('/demandes');
        });
    });
  };

  return (
    <Box
      w="200%"
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form onSubmit={addDocuments}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Documents justificatifs:</FormLabel>
            <CloudinaryUploadWidget setImages={setImages} />
          </FormControl>
          <hr />
          <Carousel cards={images} />
          <hr />
          <Stack spacing={10}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              Ajouter
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default DocumentsForm;
