import { Box, Flex, Image, Input, Button, Text, Center,InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
import CustomInput from '../../components/ChakraComponents/CustomInput'


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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
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
    const { username, password, originalName, email, mobile, address } = formData;
    if (
      !username ||
      !password ||
      !originalName ||
      !email ||
      !mobile ||
      !address
    ) {
      toast("🥺 Please fill in all fields to proceed");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/User/${username}`);
      if (response.status === 200) {
        toast("😐 This username is already taken");
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
          navigate("/");
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
    <Flex height="100vh" direction={{ base: "column", md: "row" }} >

      <Box flex="1" bg={`linear-gradient(90deg, #f5e4fe, #f8edfe, #fcf6ff)`}>
        <Center height={{ md: "100vh" }}>
          <Box width="70%" mx={10} p={0} >
            <Image
              src={Logo}
            />
            <CustomInput
              required
              placeholder="Username"
              mb={4}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <InputGroup >
            <CustomInput
                placeholder="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                mb={0}
                value={formData.password}
                onChange={handleInputChange} 
                flexShrink={0}
                width="100%"/>
             <InputRightElement 
              width="2.5rem">
                <IconButton
                bg='#00000000'
                  size="sm"
                  variant="ghost"
                  color="gray.500"
                  _hover={{bg:'#00000000'}}
                  width={30}
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleTogglePassword}
                  flexShrink={0}
                />
              </InputRightElement>
            </InputGroup>
            <PasswordStrengthBar
                style={{
                  marginTop: '0px',
                  borderRadius: '5px', 
                  margin: '0px 10px',
                }}
                password={password}/>
            <CustomInput
              required
              placeholder="Name"
              mb={4}
              name="originalName"
              value={formData.originalName}
              onChange={handleInputChange}
            />
            <CustomInput
              placeholder="Email"
              name="email"
              type="email" mb={6}
              value={formData.email}
              onChange={handleInputChange} />
            <CustomInput
              placeholder="Mobile"
              mb={4}
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <CustomInput
              placeholder="Address"
              name="address"
              mb={6}
              value={formData.address}
              onChange={handleInputChange} />
            <Button size="md" width="full" onClick={createUser}>
              Sign In
            </Button>
            <Center> <Text display={{base:"flex",md:"none"}} >Already a Member ? <a href="/" ><Text textDecoration="underline">Login</Text> </a></Text></Center>
          </Box>
        </Center>

      </Box>
      <Box flex="1" position="relative" display={{base:"none",md:"flex"}} bg="#fcf6ff">
        <Image
          borderRadius="25% 0 0 25%"
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
          <Text fontSize={{ mobileS: "15px", mobileM: "15px", sm: "20px", md: "20px", lg: "20px" }} fontWeight={400} mb={2} color={"black"} >
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