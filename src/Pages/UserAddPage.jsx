import { Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import UserForm from '../components/UserForm';

const UserAddPage = () => {
  return (
    <>
      <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
        >
          <Stack align={'center'}>
            <Heading
              fontSize={'4xl'}
              mb={8}
            >
              Ajouter Users:
            </Heading>
            <UserForm />
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default UserAddPage;
