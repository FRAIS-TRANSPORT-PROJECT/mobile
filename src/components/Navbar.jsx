import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  ButtonGroup,
  Text,
  Spacer,
  VStack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import icon from './frais.png';
import { useContext, useEffect } from 'react';
import { AuthContext } from '..';

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}
    href={to}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { role, setRole } = useContext(AuthContext);
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.800')}
        px={4}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={'center'}
          >
            <Box>
              <Image
                src={icon}
                alt="Dan Abramov"
                height="40px"
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLink
                key={1}
                to="/"
              >
                Home
              </NavLink>
              {role == 'ROLE_MANAGER' ? (
                <NavLink
                  key={2}
                  to="/demandes"
                >
                  Demandes
                </NavLink>
              ) : (
                <></>
              )}
              {role == 'ROLE_DEMANDEUR' ? (
                <>
                  <NavLink
                    key={2}
                    to="/demandes"
                  >
                    Demandes
                  </NavLink>
                  <NavLink
                    key={3}
                    to="/demandes/add"
                  >
                    Ajouter demandes
                  </NavLink>
                </>
              ) : (
                <></>
              )}
              {role == 'ROLE_ADMIN' ? (
                <>
                  <NavLink
                    key={4}
                    to="/users/add"
                  >
                    Ajouter User
                  </NavLink>
                  <NavLink
                    key={5}
                    to="/users"
                  >
                    List users
                  </NavLink>
                </>
              ) : (
                <></>
              )}
            </HStack>
          </HStack>
          <ButtonGroup gap="2">
            <HStack>
              <Text fontWeight="medium">{username}</Text>
              <Text>—</Text>
              <Text>{role}</Text>
            </HStack>
            {/* <Button colorScheme="teal">Sign Up</Button> */}
            {role == null ? (
              <>
                <Button colorScheme="teal">
                  <Link href="/login">Login</Link>
                </Button>
              </>
            ) : (
              <>
                <>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      localStorage.removeItem('role');
                      localStorage.removeItem('userId');
                      localStorage.removeItem('username');
                      localStorage.removeItem('user');
                    }}
                  >
                    <Link href="/">Logout</Link>
                  </Button>
                </>
              </>
            )}
          </ButtonGroup>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            display={{ md: 'none' }}
          >
            <>
              <VStack>
                <NavLink
                  key={1}
                  to="/"
                >
                  Home
                </NavLink>
                {role == 'ROLE_MANAGER' ? (
                  <NavLink
                    key={2}
                    to="/demandes"
                  >
                    Demandes
                  </NavLink>
                ) : (
                  <></>
                )}
                {role == 'ROLE_DEMANDEUR' ? (
                  <>
                    <NavLink
                      key={2}
                      to="/demandes"
                    >
                      Demandes
                    </NavLink>
                    <NavLink
                      key={3}
                      to="/demandes/add"
                    >
                      Ajouter demandes
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}
                {role == 'ROLE_ADMIN' ? (
                  <>
                    <NavLink
                      key={4}
                      to="/users/add"
                    >
                      Ajouter User
                    </NavLink>
                    <NavLink
                      key={5}
                      to="/users"
                    >
                      List users
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}
                <ButtonGroup gap="2">
                  <VStack>
                    <HStack>
                      <Text fontWeight="medium">{username}</Text>
                      <Text>—</Text>
                      <Text>{role}</Text>
                    </HStack>
                    {/* <Button colorScheme="teal">Sign Up</Button> */}
                    {role == null ? (
                      <>
                        <Button colorScheme="teal">
                          <Link href="/login">Login</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              localStorage.removeItem('role');
                              localStorage.removeItem('userId');
                              localStorage.removeItem('username');
                              localStorage.removeItem('user');
                            }}
                          >
                            <Link href="/">Logout</Link>
                          </Button>
                        </>
                      </>
                    )}
                  </VStack>
                </ButtonGroup>
              </VStack>
            </>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
