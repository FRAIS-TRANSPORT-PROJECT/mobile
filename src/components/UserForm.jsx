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
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import { Select } from 'chakra-react-select';
import { State } from 'country-state-city';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../tools/Constants';

import { AuthContext } from '..';
const UserForm = () => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const roles = ROLES.map((t) => {
    return {
      value: t,
      label: t
    };
  });

  const addUser = (event) => {
    event.preventDefault();
    const elements = event.currentTarget.elements;

    const data = {
      email: elements.email.value,
      password: elements.password.value,
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      matricule: elements.matricule.value,
      role: role
    };

    console.log(data);
    let endpoint = '';
    switch (role) {
      case 'ROLE_MANAGER':
        endpoint = 'managers';
        break;
      case 'ROLE_DEMANDEUR':
        endpoint = 'demandeurs';
        break;
    }

    axios
      .post('http://10.0.2.2:8086/api/v1/' + endpoint, data, {
        headers: {
          Authorization: `Basic ${user}`,
          'content-type': 'application/json'
        }
      })
      .then((d) => {
        // console.log(d.data['id']);
        navigate('/demandes');
      });
  };

  return (
    <Box
      w="120%"
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form onSubmit={addUser}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              id="email"
              type="email"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input
              id="password"
              type="password"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Prenom:</FormLabel>
            <Input
              id="firstName"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nom:</FormLabel>
            <Input
              id="lastName"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Matricule:</FormLabel>
            <Input
              id="matricule"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Role: </FormLabel>
            <Select
              inputId="roles"
              options={roles}
              onChange={(v) => setRole(v.value)}
              required
            />
          </FormControl>
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

export default UserForm;
