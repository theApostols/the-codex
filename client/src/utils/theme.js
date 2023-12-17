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
        color: 'white',
        border: '1px solid',
        borderColor: 'codex.highlights',
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

const linkStyles = {
  Link: {
    variants: {
      link: {
        color: 'codex.accents',
        textDecoration: 'none',
        _hover: {
          textDecoration: 'underline',
          color: 'codex.highlights',
        },
        _active: {
          color: 'codex.linkActive',
        },
      },
    },
  },
};

const globalStyles = {
  styles: {
    global: {
      'html, body': {
        fontSize: '16px',
        fontFamily: 'Helvetica, sans-serif',
        lineHeight: '1.6',
        backgroundColor: 'codex.main',
        backgroundImage: 'linear-gradient(to right top, #211e33, #232036, #252239, #27243d, #292640)',
      },
    },
  },
};

const customTheme = extendTheme({
  colors,
  components: {
    ...buttonStyles,
    ...linkStyles,
  },
  ...globalStyles,
});

export default customTheme;