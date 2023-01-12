import { Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import DemandeForm from '../components/DemandeForm';
import Navbar from '../components/Navbar';

const DemandeAddPage = () => {
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
              Ajouter une Demande:
            </Heading>
            <DemandeForm />
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default DemandeAddPage;
