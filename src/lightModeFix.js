import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

const ForceLightMode = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') return;
    toggleColorMode();
  }, [colorMode]);

  return props.children;
};

export default ForceLightMode;
