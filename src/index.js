import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { routes } from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider} from '@chakra-ui/react';
import {
  RecoilRoot,
} from 'recoil';

import { RouterProvider } from 'react-router-dom';
import { Button } from './components/CustomButton';
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  components: {
    Button,
  },
  breakpoints: {
    custom: "320px",
    sm:"421px"
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <RecoilRoot>
    <RouterProvider router={routes}></RouterProvider>
    </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
