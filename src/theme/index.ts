import { extendTheme } from '@chakra-ui/react';
import Button from "./button";

const defaultSansSerif = "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif";
const defaultEmoji = "Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export default extendTheme({ 
  fonts: {
    heading: `Urbanist,${defaultSansSerif},${defaultEmoji}`,
    body: `Urbanist,${defaultSansSerif},${defaultEmoji}`,
    mono: "'Roboto Mono', Menlo, monospace",
  },
  colors, 
  components: {
    Button
  } 
});