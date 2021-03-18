import { createMuiTheme, makeStyles } from "@material-ui/core";

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#dd2c00",
    },
  },
  typography: {
    fontFamily: "Comic Sans MS",
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary",
    },
    MuiTextField: {
      size: "small",
      margin: "dense",
    },
    MuiPaper: {
      elevation: 12,
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));
