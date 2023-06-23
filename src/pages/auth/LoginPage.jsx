import { Box, Flex, Image, Input, Button, Text } from "@chakra-ui/react";
import AuthImage from '../../images/AuthImage.png'
import React from 'react'
import { colors } from '../../constants/contants'
// import { Button1, CustomButton} from '../../components/CustomButton'
import { CustomText } from "../../components/CustomText";

function LoginPage() {
  return (
    <Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <Box flex="1" position="relative">
        <Image
          src={AuthImage} // Replace with your image URL
          alt="Login Image"
          w="100%"
          h="100%"
        />
        <Box
          position="absolute"
          bottom={{ base: "0%",custom:"-7%"}}
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
        >
          <Text fontSize={{base:"sm",sm:"sm",md:"md",lg:"lg"}} fontWeight="bold" mb={4} color={"black"}>
            New to Pet Basket?
          </Text>
          {/* <CustomText size="lg" fontWeight="bold">
            New to Pet Basket?
          </CustomText> */}

          <Button>
            Register
          </Button>
        </Box>
      </Box>
      <Box flex="1">
        {/* Login Form */}
        <Box maxW="sm" mx="auto" p={8}>
          <Input placeholder="Username" mb={4} />
          <Input placeholder="Password" type="password" mb={6} />
          <Button colorScheme="blue" size="lg" width="full">
            Sign In
          </Button>
        </Box>
      </Box>

    </Flex>
  );
};

export default LoginPage;