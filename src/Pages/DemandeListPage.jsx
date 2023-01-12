import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Tag,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '..';
import DemandeCard from '../components/DemandeCard';
import Navbar from '../components/Navbar';

const DemandeListPage = () => {
  const [demandes, setDemandes] = useState([]);
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  useEffect(() => {
    axios
      .get(
        role == 'ROLE_MANAGER'
          ? `http://10.0.2.2:8086/api/v1/demandes`
          : `http://10.0.2.2:8086/api/v1/demandes/search/findByDemandeurId?id=${userId}`,
        {
          headers: {
            Authorization: `Basic ${user}`
          }
        }
      )
      .then((d) => {
        console.log(d.data['_embedded'].demandes);
        setDemandes(d.data['_embedded'].demandes);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Container
        bg={useColorModeValue('gray.50', 'gray.800')}
        maxW={'100%'}
      >
        <Container
          maxW={'6xl'}
          p="2"
        >
          <Heading
            as="h1"
            margin={10}
          >
            List des demandes:
          </Heading>
          <hr />
          {demandes.map((demande) => {
            return (
              <div key={demande.id}>
                <DemandeCard
                  data={demande}
                  setDemandes={setDemandes}
                />
                <hr />
              </div>
            );
          })}
        </Container>
      </Container>
    </>
  );
};

export default DemandeListPage;
