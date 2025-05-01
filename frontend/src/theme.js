import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#f0e4ff',
    100: '#cbb2ff',
    200: '#a67fff',
    300: '#804dff',
    400: '#5a1aff',
    500: '#4100e6',
    600: '#3200b4',
    700: '#230082',
    800: '#140051',
    900: '#050021',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.600',
        },
      }),
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});

export default theme; 