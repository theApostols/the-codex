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
    text: '#FFFFFF',
    text200: "#E0E0E0",
    accents200: '#87cac3',
    accents300: "#448780",
    // Asegúrate de agregar cualquier otro color que necesites aquí
  },
};

// Define button styles variants
const buttonStyles = {
  Button: {
    variants: {
      primary: {
        bg: 'codex.main',
        color: 'codex.text',
        _hover: {
          bg: 'codex.dark',
        },
      },
      secondary: {
        bg: 'codex.highlights',
        color: 'codex.text',
        _hover: {
          bg: 'codex.borders',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'codex.text',
        _hover: {
          bg: 'codex.dark',
          color: 'codex.text',
        },
      },
      outline: {
        bg: 'transparent',
        color: 'codex.text',
        border: '1px solid',
        borderColor: 'codex.highlights',
        _hover: {
          bg: 'codex.dark',
          color: 'codex.text',
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
        color: 'codex.text',
        textDecoration: 'none',
        _hover: {
          textDecoration: 'underline',
          color: 'codex.highlights',
        },
        _active: {
          color: 'codex.accents200',
        },
      },
      icon: {
        background: 'transparent',
        border: 'none',
        color: 'codex.borders',
        _hover: {
          color: 'codex.highlights',
        },
        _active: {
          color: 'codex.highlights',
        },
      },
    },
  },
};

const linkStyles = {
  Link: {
    variants: {
      link: {
        color: 'codex.text',
        textDecoration: 'none',
        _hover: {
          textDecoration: 'underline',
          color: 'codex.highlights',
        },
        _active: {
          color: 'codex.accents200',
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
