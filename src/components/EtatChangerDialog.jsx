import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Icon,
  chakra,
  Tooltip,
  Button,
  useDisclosure,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useRef, useState } from 'react';
import { TbHandClick } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { ETATS } from '../tools/Constants';

const EtatChangerDialog = ({
  changeEtat,
  currentEtat,
  demandeId,
  currentJustif
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [justif, setJustif] = useState(currentJustif);
  const [etat, setEtat] = useState(currentEtat);

  const etats = ETATS.map((t) => {
    return {
      value: t,
      label: t
    };
  });

  return (
    <>
      <Tooltip
        label="Valider"
        bg="white"
        placement={'top'}
        color={'gray.800'}
        fontSize={'1.2em'}
      >
        <chakra.a
          href={'#'}
          display={'flex'}
        >
          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            onClick={onOpen}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg'
            }}
          >
            Changer etat
          </Button>
        </chakra.a>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Changer etat
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl>
                <FormLabel>Justification:</FormLabel>
                <Textarea
                  id="justif"
                  defaultValue={currentJustif}
                  onChange={(event) => setJustif(event.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Etats: </FormLabel>
                <Select
                  inputId="etats"
                  options={etats}
                  defaultValue={{
                    label: currentEtat,
                    value: currentEtat
                  }}
                  onChange={(v) => setEtat(v.value)}
                  required
                />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                colorScheme="red"
              >
                Annuler
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  console.log(etat);
                  changeEtat(demandeId, justif, etat);
                  onClose();
                }}
                ml={3}
              >
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default EtatChangerDialog;
