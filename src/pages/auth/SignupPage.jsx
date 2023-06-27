import { Box, Flex, Image, Input, Button, Text, Center } from "@chakra-ui/react";
import AuthImage from '../../images/AuthImage.png'
import Logo from '../../images/Logo.png'
import {React, useState} from 'react'
import { colors,baseUrl } from "../../constants/contants";
import { useNavigate } from 'react-router-dom';
import { loginFormData,authStatus } from "../../recoilAtoms/Auth";
import {useRecoilState } from "recoil";
import axios from "axios";
  

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    originalName: '',
    email: '',
    mobile:'',
    address:'',
  });
  const [_,setAuthStatus]=useRecoilState(authStatus);
  
  function handleInputChange(event){
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function createUser(event){
    event.preventDefault();
      // Access the form values from the state (formData)
      const { username, password,originalName,email,mobile,address } = formData;
      // Do something with the form values
      axios.post(`${baseUrl}/UserModels`,{
        username: username,
        password: password,
        name: originalName,
        email: email,
        mobile:mobile,
        address:address,
        role:"user",
        verified:false
      }).then((response) => {
        setAuthStatus({status:true, userName:response.data.userName});
        console.log(response.data);
      });;
  }

  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      
      <Box flex="1" bg={colors.primaryLight}>
        {/* Login Form */}
        <Center height={{md:"100vh"}}>
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
              onChange={handleInputChange}/>
           <Input
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
              onChange={handleInputChange}/>
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
              onChange={handleInputChange}/>
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
          bottom={{mobileS:"-5%" ,mobileM:"-0%", sm: "0%", md:"0%", lg:"8%",xl:"8%"}}
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
        >
          <Text fontSize={{mobileS:"15px" ,mobileM:"15px", sm: "20px", md: "20px", lg: "20px" }} fontWeight="bold" mb={2} color={"black"}>
            Already a Member, Please Login?
          </Text>
          <Button size={{mobileS:"mobileS" ,mobileM:"mobileM", sm: "sm", md: "md", lg: "lg",xl:"xl" }} onClick={()=>{
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