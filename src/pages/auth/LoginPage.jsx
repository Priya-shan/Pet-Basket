import { Box, Flex, Image, Input, Button, Text, Center, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthImage from '../../images/AuthImage.png'
import Logo from '../../images/Logo.png'
import { React, useEffect, useState } from 'react'
import { colors, baseUrl, encryptionKey } from "../../constants/contants";
import { useNavigate } from 'react-router-dom';
import { authStatus } from "../../recoilAtoms/Auth";
import {useSetRecoilState } from "recoil";
import axios from "axios";
import { AES } from 'crypto-js';
import { toast } from 'react-toastify';
import CustomInput from '../../components/ChakraComponents/CustomInput'

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const setAuthStatus = useSetRecoilState(authStatus);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function authenticateUser(event) {
    event.preventDefault();
    const { username, password } = formData;
    if (
      !username ||
      !password
    ) {
      toast("🥺 Please fill in all fields to proceed");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/User/${username}`);
      if (response.data.password === password) {
        const encryptedUsername = AES.encrypt(username, encryptionKey).toString();
        localStorage.setItem('username', encryptedUsername);
        setAuthStatus({ status: true, userName: username });
      } else {
        toast("😨 Password Incorrect");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast("🧐 No Such User Exists");
      } else {
        toast("🤐 An unkown error occured... Try again !");
        console.log("An error occurred while making the request:", error);
      }
    }
  }
  useEffect(() => {
    console.log("login page");
  }, []);

  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <Box flex="1" position="relative" bg="#fcf6ff">
        <Image
          borderRadius="0 25% 25% 0"
          src={AuthImage}
          alt="Login Image"
          w="100%"
          h="100%"
        />
        
        <Box
          position="absolute"
          bottom={{ mobileS: "-5%", mobileM: "-0%", sm: "0%", md: "0%", lg: "8%", xl: "8%" }}
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
        >
          <Text fontSize={{ mobileS: "15px", mobileM: "15px", sm: "18px", md: "18px", lg: "18px" }} fontWeight={400} mb={2} color={"black"}>
            New to Pet Basket?
          </Text>
          <Button size={{ mobileS: "mobileS", mobileM: "mobileM", sm: "sm", md: "md", lg: "lg", xl: "xl" }} onClick={() => {
            navigate('/signup');
          }}>
            Register
          </Button>
        </Box>
      </Box>
      <Box flex="1" bg={`linear-gradient(270deg, #f1dbfd, #f5e4fe, #f8edfe, #fcf6ff)`}>
        <Center height={{ md: "100vh" }}>
          <Box width='70%' mx={10} p={0} >
            <Image
              src={Logo}
            />

            <CustomInput
              placeholder="Username"
              mb={4}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <InputGroup>
              <CustomInput
                placeholder="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                mb={6}
                value={formData.password}
                onChange={handleInputChange}
                flexShrink={0}
                width="100%" />
              <InputRightElement
                width="2.5rem">
                <IconButton
                  bg='#00000000'
                  size="sm"
                  variant="ghost"
                  color="gray.500"
                  _hover={{ bg: '#00000000' }}
                  width={30}
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleTogglePassword}
                  flexShrink={0}
                />
              </InputRightElement>
            </InputGroup>
            <Button size="md" width="full" onClick={authenticateUser}>
              Sign In
            </Button>
          </Box>
        </Center>
      </Box>

    </Flex>

  );
};

export default LoginPage;