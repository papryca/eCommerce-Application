import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#435b66",
      light: "#222f36",
    },
    secondary: {
      main: "#ff725e",
    },
    info: {
      main: "#ffbe9d",
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
