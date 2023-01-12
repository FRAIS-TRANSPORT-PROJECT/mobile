import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { AuthContext } from '..';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  // const auth = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    const elements = event.currentTarget.elements;

    const credentials = window.btoa(
      `${elements.username.value}:${elements.password.value}`
    );

    console.log(credentials);

    axios
      .get('http://10.0.2.2:8086/login', {
        headers: {
          Authorization: `Basic ${credentials}`
        }
      })
      .then((res) => {
        console.log(res.data);
        const role = res.data.role;
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('user', credentials);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem(
          'username',
          `${res.data.firstName} ${res.data.lastName.toUpperCase()}`
        );
        // auth.setRole(res.data.role);
        // auth.setUser(credentials);
        switch (role) {
          case 'ROLE_ADMIN':
            navigate('/users');
            break;
          default:
            navigate('/demandes');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container
          bg={useColorModeValue('gray.50', 'gray.800')}
          maxW={'100%'}
        >
          <Stack
            spacing={8}
            mx={'auto'}
            maxW={'lg'}
            py={12}
            px={6}
          >
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Connectez vous</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={login}>
                  <FormControl id="username">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
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
                      Connectez
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default LoginPage;
