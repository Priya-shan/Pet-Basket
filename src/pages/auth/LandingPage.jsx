import { Box, Flex, Image, Input, Button, Text, Center } from "@chakra-ui/react";
import AuthImage from '../../images/AuthImage.png'
import Logo from '../../images/Logo.png'
import {React, useEffect, useState} from 'react'
import { colors, baseUrl,encryptionKey } from "../../constants/contants";
import { useNavigate } from 'react-router-dom';
import { loginFormData,authStatus } from "../../recoilAtoms/Auth";
import {useRecoilState } from "recoil";
import axios from "axios";
import Cookies from 'js-cookie';
import HomePage from "../user/HomePage";
import SignupPage from "./SignupPage";
import { AES } from 'crypto-js';
import CryptoJS from "crypto-js";



function LoginPage() {
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const encryptedUsernameFromStorage = localStorage.getItem('username');
        const decryptedBytes = AES.decrypt(encryptedUsernameFromStorage, encryptionKey);
        const decryptedUsername = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // checkUsername(decryptedUsername)
    
        },[]);
    
    const checkUsername = (username) => {
        axios
          .get(`${baseUrl}/UserModel`)
          .then((response) => {
            const users = response.data;
            const isUsernameExists = users.some(user => user.username === username);
            
            if (isUsernameExists) {
              console.log('Username exists in the table');
              setIsLoggedIn(true);
            } else {
              console.log('Username does not exist in the table');
              setIsLoggedIn(false);
            }
          })
          .catch((error) => {
            console.error('Error occurred while checking the username:', error);
          });
      };

  const navigate = useNavigate();

  let componentToRender;
//   if (isLoggedIn) {
//     componentToRender = <HomePage />;
//   } else {
//     componentToRender = <LoginPage/>
//   }
  return (
   <>{isLoggedIn ? <div>Hii</div>: <LoginPage/> } </>
  );
};

export default LoginPage;