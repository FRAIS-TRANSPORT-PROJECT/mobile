import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import ForceLightMode from './lightModeFix';
import App from './App';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};

const lightTheme = extendTheme({ config });

const root = ReactDOM.createRoot(document.getElementById('root'));

export const AuthContext = createContext(null);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={lightTheme}>
      <ForceLightMode>
        <App />
      </ForceLightMode>
    </ChakraProvider>
  </React.StrictMode>
);
