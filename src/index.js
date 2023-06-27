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
import {inputTheme} from './components/CustomInput'
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  components: {
    Button,
    Input:inputTheme,
  },
  breakpoints: {
    mobileS:"320px",
    mobileM:"375px",
    sm: "425px",
    md:"768px",
    lg:"1024px",
    xl:"1140px",
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}>
    <ChakraProvider theme={theme}>
    {/* <RecoilRoot> */}
    
    {/* </RecoilRoot> */}
    </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
