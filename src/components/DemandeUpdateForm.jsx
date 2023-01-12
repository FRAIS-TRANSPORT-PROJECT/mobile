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
  useColorModeValue,
  useSafeLayoutEffect
} from '@chakra-ui/react';
import axios from 'axios';
import { Select } from 'chakra-react-select';
import { State } from 'country-state-city';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '..';
import { ETATS } from '../tools/Constants';
const DemandeUpdateForm = () => {
  // const { user } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [transport, setTransport] = useState('');
  const [villeDep, setVilleDep] = useState('');
  const [villeAr, setVilleAr] = useState('');
  const [etat, setEtat] = useState('');
  const [demande, setDemande] = useState({});

  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get('http://10.0.2.2:8086/api/v1/demandes/' + id, {
        headers: {
          Authorization: `Basic ${user}`,
          'content-type': 'application/json'
        }
      })
      .then((d) => {
        console.log(d.data);
        setDemande(d.data);
        setTransport(d.data.moyenTransport);
        setVilleAr(d.data.villeArrive);
        setVilleDep(d.data.villeDepart);
        setEtat(d.data.etat);
      });
  }, []);

  const updateDemande = (event) => {
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
      .put('http://10.0.2.2:8086/api/v1/demandes/' + id, data, {
        headers: {
          Authorization: `Basic ${user}`,
          'content-type': 'application/json'
        }
      })
      .then((d) => {
        // console.log(d.data['id']);
        // navigate('/demandes/' + d.data['id'] + '/documents/add');
        navigate('/demandes/');
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
      <form onSubmit={updateDemande}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Motif:</FormLabel>
            <Input
              id="motif"
              type="text"
              //   value={demande.motif || ''}
              defaultValue={demande.motif}
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
                defaultValue={demande.frais}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Moyen de transport:</FormLabel>
            <Select
              inputId="transport"
              options={transports}
              value={{
                label: transport,
                value: transport
              }}
              onChange={(v) => setTransport(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ville de départ:</FormLabel>
            <Select
              inputId="ville-dep"
              options={cities}
              value={{
                label: villeDep,
                value: villeDep
              }}
              onChange={(v) => setVilleDep(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ville d'arrivé:</FormLabel>
            <Select
              inputId="ville-ar"
              options={cities}
              value={{
                label: villeAr,
                value: villeAr
              }}
              onChange={(v) => setVilleAr(v.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date de départ:</FormLabel>
            <Input
              id="date-dep"
              type="date"
              value={
                new Date(demande.dateDebut).toLocaleDateString('en-CA') || ''
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date d'arrivé:</FormLabel>
            <Input
              id="date-ar"
              type="date"
              value={
                new Date(demande.dateFin).toLocaleDateString('en-CA') || ''
              }
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description: </FormLabel>
            <Textarea
              id="description"
              defaultValue={demande.description}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Etats: </FormLabel>
            <Select
              inputId="etats"
              options={etats}
              value={{
                label: etat,
                value: etat
              }}
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
              Modifier demande
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default DemandeUpdateForm;
