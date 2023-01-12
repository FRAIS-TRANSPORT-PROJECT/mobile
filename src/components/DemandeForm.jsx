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
import { ETATS } from '../tools/Constants';
import { AuthContext } from '..';

const DemandeForm = () => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [transport, setTransport] = useState('');
  const [villeDep, setVilleDep] = useState('');
  const [villeAr, setVilleAr] = useState('');
  const [etat, setEtat] = useState('');

  let cities = State.getStatesOfCountry('MA').map((city) => {
    return {
      value: city.name,
      label: city.name
    };
  });

  const transports = ['Voiture', 'Bus', 'Train', 'Avion'].map((t) => {
    return {
      value: t,
      label: t
    };
  });

  const etats = ETATS.map((t) => {
    return {
      value: t,
      label: t
    };
  });

  const addDemande = (event) => {
    event.preventDefault();
    const elements = event.currentTarget.elements;

    const data = {
      motif: elements.motif.value,
      description: elements.description.value,
      moyenTransport: transport,
      frais: elements.frais.value,
      dateDebut: elements['date-dep'].value,
      dateFin: elements['date-ar'].value,
      villeDepart: villeDep,
      villeArrive: villeAr,
      etat: etat
    };

    console.log(data);
    axios
      .post('http://10.0.2.2:8086/api/v1/demandes', data, {
        headers: {
          Authorization: `Basic ${user}`,
          'content-type': 'application/json'
        }
      })
      .then((d) => {
        // console.log(d.data['id']);
        const res = d;
        axios
          .put(
            `http://10.0.2.2:8086/api/v1/demandes/${res.data['id']}/demandeur`,
            `http://10.0.2.2:8086/api/v1/demandeurs/${userId}`,
            {
              headers: {
                Authorization: `Basic ${user}`,
                'content-type': 'text/uri-list'
              }
            }
          )
          .then((d) => {
            // console.log(d.data['id']);
            navigate('/demandes/' + res.data['id'] + '/documents/add');
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
      <form onSubmit={addDemande}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Motif:</FormLabel>
            <Input
              id="motif"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Frais:</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1em"
                children="$"
                required
              />
              <Input
                id="frais"
                placeholder="Enter amount"
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Moyen de transport:</FormLabel>
            <Select
              inputId="transport"
              options={transports}
              onChange={(v) => setTransport(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ville de départ:</FormLabel>
            <Select
              inputId="ville-dep"
              options={cities}
              onChange={(v) => setVilleDep(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ville d'arrivé:</FormLabel>
            <Select
              inputId="ville-ar"
              options={cities}
              onChange={(v) => setVilleAr(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date de départ:</FormLabel>
            <Input
              id="date-dep"
              type="date"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date d'arrivé:</FormLabel>
            <Input
              id="date-ar"
              type="date"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description: </FormLabel>
            <Textarea id="description" />
          </FormControl>
          <FormControl>
            <FormLabel>Etats: </FormLabel>
            <Select
              inputId="etats"
              options={etats}
              onChange={(v) => setEtat(v.value)}
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
              Demander
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default DemandeForm;
