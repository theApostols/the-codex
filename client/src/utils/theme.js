import { extendTheme } from '@chakra-ui/react';

// Define your color palette
const colors = {
  codex: {
    darkest: '#181726',
    dark: '#211E33',
    main: '#292640',
    borders: '#413C66',
    highlights: '#8278CC',
    accents: '#A5E9E1',
    disabledBg: '#CCCCCC',
    disabledText: '#666666',
    linkHover: '#4B9A94',
    linkActive: '#3D7873',
  },
};

// Define button styles variants
const buttonStyles = {
  Button: {
    variants: {
      primary: {
        bg: 'codex.main',
        color: 'white',
        _hover: {
          bg: 'codex.highlights',
        },
      },
      secondary: {
        bg: 'codex.highlights',
        color: 'white',
        _hover: {
          bg: 'codex.borders',
        },
      },
      accent: {
        bg: 'codex.accents',
        color: 'black',
        _hover: {
          bg: 'codex.highlights',
        },
      },
      outline: {
        bg: 'transparent',
        color: 'codex.main',
        border: '1px solid',
        borderColor: 'codex.main',
        _hover: {
          bg: 'codex.main',
          color: 'white',
        },
      },
      disabled: {
        bg: 'codex.disabledBg',
        color: 'codex.disabledText',
        _hover: {
          bg: 'codex.disabledBg',
        },
        cursor: 'not-allowed',
      },
      link: {
        bg: 'transparent',
        color: 'codex.accents',
        textDecoration: 'underline',
        _hover: {
          textDecoration: 'none',
          bg: 'transparent',
          color: 'codex.linkHover',
        },
        _active: {
          bg: 'transparent',
          color: 'codex.linkActive',
        },
      },
    },
  },
};

// Combine the color palette and button styles into a custom theme
const customTheme = extendTheme({
  colors,
  components: {
    ...buttonStyles,
  },
});

export default customTheme;
