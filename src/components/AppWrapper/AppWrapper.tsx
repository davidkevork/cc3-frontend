import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#F0F1F2',
      main: '#D363F2',
    },
    secondary: {
      contrastText: '#F0F1F2',
      main: '#389BF2',
    },
    text: {
      primary: '#130526',
      secondary: '#262424',
    },
    background: {
      default: '#F0F1F2',
    },
  },
});

interface IAppWrapperState {
  readonly initDone: boolean;
  readonly infoBar: string;
  readonly fullInfoBar: string;
}

class AppWrapper extends React.Component<{ children?: any }, IAppWrapperState> {
  public render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>{this.props.children}</CssBaseline>
        <ToastContainer
          hideProgressBar={false}
          newestOnTop={true}
          pauseOnHover={false}
          autoClose={4000}
        />
      </MuiThemeProvider>
    );
  }
}

export default AppWrapper;
