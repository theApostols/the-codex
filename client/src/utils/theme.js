import { extendTheme } from '@chakra-ui/react';

// Dark mode colors
const darkColors = {
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
  },
};

// Light mode colors
const lightColors = {
  codex: {
    darkest: '#f0f0f3',
    dark: '#dadada',
    main: '#ffffff',
    borders: '#90899E',
    // borders: '#989898',
    highlights: '#b5aedd',
    // highlights: '#EAE9F8',
    accents: '#413C66',
    text: '#1d1c1c',
    text200: '#313d44',
    accents200: '#a0e0dd',
    accents300: '#211E33',
  },
};

// Button styles
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
        // bg: 'codex.highlights',
        bg: 'codex.borders',
        color: 'codex.text',
        _hover: {
          // bg: 'codex.borders',
          bg: 'codex.highlights',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'codex.accents',
        _hover: {
          bg: 'codex.dark',
          color: 'codex.highlights',
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

// Link styles
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

// Global styles for dark mode
const globalDarkStyles = {
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

// Global styles for light mode
const globalLightStyles = {
  styles: {
    global: {
      'html, body': {
        fontSize: '16px',
        fontFamily: 'Helvetica, sans-serif',
        lineHeight: '1.6',
        backgroundColor: 'codex.main',
        color: 'codex.text',
      },
    },
  },
};

// Dark mode theme
const darkTheme = extendTheme({
  colors: darkColors,
  components: {
    ...buttonStyles,
    ...linkStyles,
  },
  ...globalDarkStyles,
});

// Light mode theme
const lightTheme = extendTheme({
  colors: lightColors,
  components: {
    ...buttonStyles,
    ...linkStyles,
  },
  ...globalLightStyles,
});

export { darkTheme, lightTheme };