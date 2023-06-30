import { Box, Flex, Image, Input, Button, Text, Center } from "@chakra-ui/react";
import AuthImage from '../../images/AuthImage.png'
import Logo from '../../images/Logo.png'
import { React, useState } from 'react'
import { colors, baseUrl } from "../../constants/contants";
import { useNavigate } from 'react-router-dom';
import { loginFormData, authStatus } from "../../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import axios from "axios";
import {toast} from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';


function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    originalName: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [_, setAuthStatus] = useRecoilState(authStatus);
  const [password, setPassword] = useState('');
  
  function handleInputChange(event) {
    const { name, value } = event.target;
    if(name==="password"){
      setPassword(event.target.value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function createUser(event) {
    event.preventDefault();
    // Access the form values from the state (formData)
    const { username, password, originalName, email, mobile, address } = formData;

    if (
      !username ||
      !password ||
      !originalName ||
      !email ||
      !mobile ||
      !address
    ) {
      // Display an error message or perform any necessary actions
      toast("🥺 Please fill in all fields to proceed");
      console.log('Please fill in all required fields.');
      return;
    }
    // Do something with the form values
    try {
      const response = await axios.get(`${baseUrl}/User/${username}`);
      if (response.status === 200) {
        toast("😐 This username is already taken");
        console.log("This username is already taken");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No such user exists");
        try {
          const response = await axios.post(`${baseUrl}/User`, {
            username: username,
            password: password,
            name: originalName,
            email: email,
            mobile: mobile,
            address: address,
            role: "user",
            verified: false
          });
          setAuthStatus({ status: true, userName: response.data.userName });
          console.log(response.data);
        }
        catch (error) {
          toast("🤐 An unkown error occured... Try again !");
          console.log("An error occurred while making the post request:", error);
        }
      } else {
        console.log("An error occurred while making the get request:", error);
      }
    }
  }

  return (
    <Flex height="100vh" direction={{ base: "column-reverse", md: "row" }} >

      <Box flex="1" bg={colors.primaryLight}>
        {/* Login Form */}
        <Center height={{ md: "100vh" }}>
          <Box maxW="sm" mx="auto" p={8} >
            <Image
              src={Logo}
            />
            <Input
              required
              placeholder="Username"
              mb={4}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              required
              isRequired
              placeholder="Password"
              name="password"
              type="password" mb={0}
              value={formData.password}
              onChange={handleInputChange} />
            <PasswordStrengthBar
                style={{
                  marginTop: '0px',
                  borderRadius: '5px', 
                  margin: '0px 10px',
                }}
                password={password}/>
            <Input
              required
              placeholder="Name"
              mb={4}
              name="originalName"
              value={formData.originalName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email" mb={6}
              value={formData.email}
              onChange={handleInputChange} />
            <Input
              placeholder="Mobile"
              mb={4}
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Address"
              name="address"
              mb={6}
              value={formData.address}
              onChange={handleInputChange} />
            <Button size="md" width="full" onClick={createUser}>
              Sign In
            </Button>
          </Box>
        </Center>
      </Box>
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
            Already a Member, Please Login?
          </Text>
          <Button size={{ mobileS: "mobileS", mobileM: "mobileM", sm: "sm", md: "md", lg: "lg", xl: "xl" }} onClick={() => {
            navigate("/")
          }}>
            LOGIN
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupPage;