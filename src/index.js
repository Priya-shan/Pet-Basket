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
import { Button } from './components/ChakraComponents/CustomButton';
import { extendTheme } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const theme = extendTheme({
  components: {
    Button,
  },
  breakpoints: {
    mobileS:"320px",
    mobileM:"375px",
    sm: "425px",
    md:"768px",
    lg:"1024px",
    xl:"1140px",
  },
  colors: {
    brand: {
      100: "#f8edfe",
      200: '#f5e4fe',
      300: '#f1dbfd',
      400: '#eed2fd',
      500: '#ebc8fd',
      600: '#e7bffc',
      700: '#e4b6fc',
      800: '#e0adfb',
      900: "#dda4fb",
      1000: "#6f527e"
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <RecoilRoot>
    <RouterProvider router={routes}></RouterProvider>
    </RecoilRoot>
    <ToastContainer/>
    </ChakraProvider>
  </React.StrictMode>
  
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
