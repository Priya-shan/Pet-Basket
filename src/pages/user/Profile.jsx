import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { authStatus, postsState } from "../../recoilAtoms/Auth";
import Post from "../../components/Post"
import AddPostModal from "../../components/AddPostModal"
import SideBar from "../../components/SideBar"
import { Center, HStack, VStack,FormControl, FormLabel, } from '@chakra-ui/react';
import { Box, Avatar, Text, Button, Flex, Input, Stack, Image } from '@chakra-ui/react';
import BackgroundImage from "../../images/bg.png"
import { toast } from 'react-toastify';
import axios from "axios";
import { colors, baseUrl } from "../../constants/contants";
import PetDetailsModal from '../../components/PetDetailsModal';
import { fetchUserById,updateUser } from '../../api/users';
import { fetchPostById } from '../../api/posts';
import { Navigate, useLocation } from 'react-router-dom';
import { staticFilesUrl } from "../../constants/contants"
import CustomInput from '../../components/ChakraComponents/CustomInput';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        message: '',
    });
    function logout() {
        localStorage.removeItem("username");
        console.log("logging out");
        setAuthStatus({ status: false, userName: '' });
        navigate("/");
    }
    async function getPost(postData) {
        var resultArray = [];
        for (var post of postData) {
            const postResponse = await fetchPostById(post.postId);
            console.log("gonna pushhh");
            console.log(postResponse.data);
            resultArray.push(postResponse.data);
        }
        return resultArray;
    }
    async function fetchData(userName) {
        const response = await fetchUserById(userName);
        // setPosts(response.data.posts);
        console.log("inga paaruu");
        console.log(response.data.posts);
        setData(response.data);
        formData.name=response.data.name;
        formData.email=response.data.email;
        formData.mobile=response.data.mobile;
        formData.address=response.data.address;
        const postData = response.data.posts;
        setPosts(await getPost(postData));
        console.log("response set post done");
        console.log(posts);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Process the form submission here
        const response = await fetchDataa();
        const UserModel =
        {
          userName: response.data.userName,
          password: response.data.password,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          profileImageUri: response.data.profileImageUri,
          role: response.data.role,
          verified: response.data.verified
        }
        console.log(UserModel);
    
    
        const userResponse = await updateUser(authStatuss.userName, UserModel);
        console.log(userResponse);
    }    
    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function fetchDataa() {
    const response = await fetchUserById(authStatuss.userName);
    setFormData((prevState) => ({
      ...prevState,
      ["name"]: response.data.name,
      ["mobile"]: response.data.mobile,
      ["email"]: response.data.email,
      ["address"]: response.data.address,
    }));
    return response;
  }
    useEffect(() => {
        if (state && state.value) {
            console.log("entered state", { state });
            fetchData(state.value);
        }
    }, [])
    return (
        < >
            <Box position="sticky" left={0} bottom={0} width="100%" display={{ base: "block", md: "none" }} zIndex={2}>
                <SideBar />
            </Box>
            <Flex backgroundImage={BackgroundImage} style={{ backgroundAttachment: 'fixed' }}>
                <Box position="sticky" left={0} top={0} height="100vh" width="300px" display={{ base: "none", md: "block" }}>
                    <SideBar />
                </Box>
                <Box p={4} width={"100%"}>
                    {/* Top Section */}
                    <Flex alignItems="center" justifyContent="center" flexDirection="column" mb={4}>
                        <Avatar size="xl" name={authStatuss.userName} src="/profile-photo.jpg" mb={2} />
                        <Text fontSize="xl" fontWeight="bold">{authStatuss.userName}</Text>
                        {authStatuss.userName != data.userName && (
                            <Button colorScheme="blue" size="sm" mt={2}>Follow</Button>
                        )}

                    </Flex>
                    <form onSubmit={handleSubmit}>
                    {/* Stats */}
                    <Flex justifyContent="space-around" mb={4}>
                        <Box textAlign="center">
                            <Text fontSize="xl" fontWeight="bold">10</Text>
                            <Text>Posts</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="xl" fontWeight="bold">100</Text>
                            <Text>Followers</Text>
                        </Box>
                        <Box textAlign="center">
                            <Text fontSize="xl" fontWeight="bold">200</Text>
                            <Text>Following</Text>
                        </Box>
                    </Flex>

                    
                    <Stack spacing={4} mb={4}>
                        <HStack>
                            
                            <FormControl id="name" >
                                <FormLabel fontSize="12px">Name:</FormLabel>
                                <CustomInput type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl id="email" >
                                <FormLabel fontSize="12px">Email:</FormLabel>
                                <CustomInput type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="phone" >
                                <FormLabel fontSize="12px">Phone Number:</FormLabel>
                                <CustomInput type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl id="address" >
                                <FormLabel fontSize="12px">Address:</FormLabel>
                                <CustomInput type="text" name="address" value={formData.address} onChange={handleInputChange} />
                            </FormControl>

                        </HStack>
                        
                    </Stack>
                    
                    {/* Edit and Save Buttons */}
                    <Flex justifyContent="flex-end" mb={4}>
                        <Button colorScheme="blue" size="sm" mr={2}>Edit</Button>
                        <Button colorScheme="green" type='submit' size="sm">Save</Button>
                    </Flex>
                    </form>
                    {/* Main Section */}
                    <Flex flexWrap="wrap" justifyContent={'space-between'} mx={5}>
                        {/* Post Images */}
                        {/* <Box bg="gray.200" h={250} w={250}> */}
                        {/* {posts.length > 0 && posts.map((post, index) => (
                            <Post
                                key={post.postId}
                                post={post}
                                margin={20}
                            />
                        ))} */}
                        {/* </Box> */}
                        {posts.length > 0 && posts.map((post, index) => (
                            <Box bg="gray.200" h={200} w={260} my={2}>
                                <Image
                                    src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`}
                                    alt={post.caption}
                                    w="100%"
                                    h="100%"
                                    objectFit={"cover"}
                                />
                            </Box>
                        ))}
                        {/* Add more boxes for more images */}
                    </Flex>
                </Box>
            </Flex>

            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Profile