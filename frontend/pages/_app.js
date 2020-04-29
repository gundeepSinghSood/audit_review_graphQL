import React from 'react';
import App from 'next/app';
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '../redux/store';
import { ThemeProvider } from "@material-ui/styles";
import {
  AppBar,
  CssBaseline,
  Typography,
  createMuiTheme,
  useMediaQuery
} from "@material-ui/core";
import '../styles/index.css';

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
// prefersDarkMode ? 'dark' : 'light'
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#fe414d',
      main: '#fe414d',
      dark: '#fe414d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#000',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
});

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be accessed by the client
        return {pageProps: pageProps};
    }

    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <Component {...pageProps}/>
                </Provider>
            </ThemeProvider>
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);