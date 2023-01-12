import {
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '..';
import Navbar from '../components/Navbar';

const UsersPage = () => {
  const [demandeurs, setDemandeurs] = useState([]);
  const [managers, setManagers] = useState([]);
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');

  useEffect(() => {
    console.log(user);
    axios
      .get(
        'http://10.0.2.2:8086/api/v1/demandeurs',

        {
          headers: {
            Authorization: `Basic ${user}`
          }
        }
      )
      .then((d) => {
        setDemandeurs(d.data['_embedded'].demandeurs);
      });

    axios
      .get(
        'http://10.0.2.2:8086/api/v1/managers',

        {
          headers: {
            Authorization: `Basic ${user}`
          }
        }
      )
      .then((d) => {
        setManagers(d.data['_embedded'].managers);
      });
  }, [user]);

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
            List des :
          </Heading>
          <hr />

          <Heading
            as="h4"
            margin={10}
          >
            Demandeurs:
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Matricule</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {demandeurs.map((user) => {
                  return (
                    <>
                      <Tr key={user.id}>
                        <Td>{user.matricule}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <hr />

          <Heading
            as="h4"
            margin={10}
          >
            Managers:
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Matricule</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {managers.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td>{user.matricule}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.role}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </>
  );
};

export default UsersPage;
