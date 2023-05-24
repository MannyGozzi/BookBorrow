import * as React from 'react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { inputTheme } from './chakra_styles/input.js'
import { Provider } from 'react-redux';
import store from './store';

const theme = extendTheme({ components: { Input: inputTheme },})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
