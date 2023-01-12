import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  HStack,
  Spacer
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router';
import { AuthContext } from '..';
import BlogTags from '../components/BlogTags';
import Carousel from '../components/Carousel';
import EtatChangerDialog from '../components/EtatChangerDialog';
import Navbar from '../components/Navbar';

const DemandePage = () => {
  const { id } = useParams();
  const [demande, setDemande] = useState({});
  const [images, setImages] = useState([]);
  // const { user } = useContext(AuthContext);

  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');
  useEffect(() => {
    axios
      .get('http://10.0.2.2:8086/api/v1/demandes/' + id, {
        headers: {
          Authorization: `Basic ${user}`,
          'Content-Type': 'application/json'
        }
      })
      .then((d) => {
        console.log(d.data);
        setDemande(d.data);
      });
    axios
      .get('http://10.0.2.2:8086/api/v1/demandes/' + id + '/documents', {
        headers: {
          Authorization: `Basic ${user}`,
          'Content-Type': 'application/json'
        }
      })
      .then((d) => {
        console.log(d.data['_embedded'].documents.map((img) => img.path));

        setImages(d.data['_embedded'].documents.map((img) => img.path));
      });
  }, []);
  const changeEtat = (id, justif, currentEtat) => {
    const demandeData = {
      etat: currentEtat,
      justification: justif
    };
    axios
      .patch('http://10.0.2.2:8086/api/v1/demandes/' + id, demandeData, {
        headers: {
          Authorization: `Basic ${user}`,
          'Content-Type': 'application/json'
        }
      })
      .then((d) => {
        console.log(d);
        axios
          .get('http://10.0.2.2:8086/api/v1/demandes/' + id, {
            headers: {
              Authorization: `Basic ${user}`,
              'Content-Type': 'application/json'
            }
          })
          .then((d) => {
            console.log(d.data);
            setDemande(d.data);
          });
      });
  };
  return (
    <>
      <Navbar />

      <Container
        bg={useColorModeValue('gray.50', 'gray.800')}
        maxW={'100%'}
      >
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              {/* <Image
                rounded={'md'}
                alt={'product image'}
                src={
                  'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                }
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              /> */}
              <Carousel cards={images} />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                >
                  {demande.motif}
                </Heading>
                <Flex>
                  <Text
                    color={useColorModeValue('gray.900', 'gray.400')}
                    fontWeight={300}
                    fontSize={'2xl'}
                  >
                    {demande.frais} MAD
                  </Text>
                  <Spacer />

                  <BlogTags tags={[demande.etat]} />
                </Flex>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  />
                }
              >
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}
                >
                  {demande.description}
                </Text>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Details demande
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Ville départ:
                      </Text>{' '}
                      {demande.villeDepart}
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Ville arrivé:
                      </Text>{' '}
                      {demande.villeArrive}
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Date Debut:
                      </Text>{' '}
                      {new Date(demande.dateDebut).toLocaleDateString()}
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Date fin:
                      </Text>{' '}
                      {new Date(demande.dateFin).toLocaleDateString()}
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Moyen transport:
                      </Text>{' '}
                      {demande.moyenTransport}
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Crystal:
                      </Text>{' '}
                      Domed, scratch‑resistant sapphire crystal with
                      anti‑reflective treatment inside
                    </ListItem>
                    <ListItem>
                      <Text
                        as={'span'}
                        fontWeight={'bold'}
                      >
                        Water resistance:
                      </Text>{' '}
                      5 bar (50 metres / 167 feet){' '}
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Justification:
                  </Text>

                  <Text
                    color={useColorModeValue('gray.500', 'gray.400')}
                    fontSize={'2xl'}
                    fontWeight={'300'}
                  >
                    {demande.justification}
                  </Text>
                </Box>
              </Stack>

              {role == 'ROLE_MANAGER' ? (
                <EtatChangerDialog
                  currentEtat={demande.etat}
                  currentJustif={demande.justification}
                  demandeId={id}
                  changeEtat={changeEtat}
                />
              ) : (
                <></>
              )}
            </Stack>
          </SimpleGrid>
        </Container>{' '}
      </Container>
    </>
  );
};

export default DemandePage;
