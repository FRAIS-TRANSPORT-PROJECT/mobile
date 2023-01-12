import { DeleteIcon, EditIcon, InfoIcon, RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import BlogTags from './BlogTags';
import { AuthContext } from '..';

const DemandeCard = ({ data, setDemandes }) => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const deleteDemande = () => {
    axios
      .delete(
        'http://10.0.2.2:8086/api/v1/demandes/' + data.id,

        {
          headers: {
            Authorization: `Basic ${user}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        console.log('deleted!');
        getDemandes();
      });
  };

  const getDemandes = () => {
    axios
      .get(
        'http://10.0.2.2:8086/api/v1/demandes',

        {
          headers: {
            Authorization: `Basic ${user}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((d) => {
        console.log(d.data['_embedded'].demandes);
        setDemandes(d.data['_embedded'].demandes);
      });
  };
  return (
    <Box
      margin={{ base: '1', sm: '5' }}
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}
      >
        <BlogTags tags={[data.etat]} />
        <Heading marginTop="1">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            {data.motif}
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="lg"
        >
          {data.description}
        </Text>

        <VStack
          gap={5}
          alignItems="flex-start"
        >
          <div>
            <Text>
              Date depart - {new Date(data.dateDebut).toLocaleDateString()}
            </Text>
            <Text>
              Date arrivé - {new Date(data.dateFin).toLocaleDateString()}
            </Text>
          </div>
          <div>
            <Text>Ville depart - {data.villeDepart}</Text>
            <Text>Ville arrivé - {data.villeArrive}</Text>
          </div>
          <div>
            <Text>Frais - {data.frais}DH</Text>
            <Text>Moyen transport- {data.moyenTransport}</Text>
          </div>
        </VStack>
        <Flex
          gap={3}
          margin={3}
          alignItems="flex-end"
          dir="row"
        >
          <Spacer />
          <Button
            colorScheme={'blue'}
            onClick={() => navigate('/demandes/' + data.id + '/update')}
          >
            <EditIcon />
          </Button>
          <Button
            colorScheme={'red'}
            onClick={() => deleteDemande()}
          >
            <DeleteIcon />
          </Button>
          <Button
            colorScheme={'green'}
            onClick={() => navigate('/demandes/' + data.id)}
          >
            <InfoIcon />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default DemandeCard;
