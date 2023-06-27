import { Box, Flex, Image, Input, Button, Text, Center } from "@chakra-ui/react";
import AuthImage from '../../images/AuthImage.png'
import Logo from '../../images/Logo.png'
import { React, useState } from 'react'
import { colors, baseUrl,encryptionKey } from "../../constants/contants";
import { useNavigate } from 'react-router-dom';
import { loginFormData, authStatus } from "../../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import axios from "axios";
import { AES } from 'crypto-js';

// const authToken = 'example-auth-token';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [_, setAuthStatus] = useRecoilState(authStatus);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function authenticateUser(event) {
    event.preventDefault();
    const { username, password } = formData;
    axios.get(`${baseUrl}/UserModels/${username}`).then((response) => {
      console.log(response.data)
      console.log(`password : ${response.data.password}`);
      if (response.data.password === password) {
        const encryptedUsername = AES.encrypt(username, encryptionKey).toString();
        localStorage.setItem('username', encryptedUsername);
        setAuthStatus({ status: true, userName: username });
      }
      else {
        setAuthStatus({ status: false, userName: '' });
        navigate('/');
      }
    });
  }
  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <Box flex="1" position="relative">
        <Image
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
          <Text fontSize={{ mobileS: "15px", mobileM: "15px", sm: "20px", md: "20px", lg: "20px" }} fontWeight="bold" mb={2} color={"black"}>
            New to Pet Basket?
          </Text>
          <Button size={{ mobileS: "mobileS", mobileM: "mobileM", sm: "sm", md: "md", lg: "lg", xl: "xl" }} onClick={() => {
            navigate('/signup');
          }}>
            Register
          </Button>
        </Box>
      </Box>
      <Box flex="1" bg={colors.primaryLight}>
        {/* Login Form */}
        <Center height={{ md: "100vh" }}>
          <Box maxW="sm" mx="auto" p={8} >
            <Image
              src={Logo}
            />

            <Input
              placeholder="Username"
              mb={4}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password" mb={6}
              value={formData.password}
              onChange={handleInputChange} />
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