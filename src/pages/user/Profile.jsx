import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { authStatus, postsState, loader } from "../../recoilAtoms/Auth";
import Post from "../../components/IndividualComponents/Post"
import EditProfileModal from "../../components/ModalComponents/EditProfileModal"
import SideBar from "../../components/SidebarComponents/SideBar"
import BackgroundImage from "../../images/bg.png"
// import { toast } from 'react-toastify';
// import axios from "axios";
// import { colors, baseUrl } from "../../constants/contants";
// import PetDetailsModal from '../../components/PetDetailsModal';
import { fetchUserById, updateUser } from '../../api/users';
import { fetchPostById } from '../../api/posts';
import { Navigate, useLocation } from 'react-router-dom';
import { staticFilesUrl } from "../../constants/contants"
import CustomInput from '../../components/ChakraComponents/CustomInput';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import Loader from "../../components/IndividualComponents/Loader"
import { Tooltip } from '@chakra-ui/react'
import {Box, Avatar, Text, Modal, useDisclosure,ModalOverlay, Image,HStack, ModalContent, ModalHeader, IconButton,Button, ModalBody, Flex, ModalCloseButton, Stack, FormControl, FormLabel } from '@chakra-ui/react';


function Profile() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const setLoading = useSetRecoilState(loader);
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postData, setPostData] = useState([]);
    const [formData, setFormData] = useState({
        userName: '',
        name: '',
        email: '',
        mobile: '',
        address: '',
        message: '',
    });
    const openModal = () => {
        console.log("entered open modal");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const  handleViewDetails =async (postId) =>  {
        await fetchPostData(postId);
        onOpen();
      };
      async function fetchPostData(postId){
        const response=await fetchPostById(postId);
        setPostData(response.data);
      }

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
        console.log("inga paaruu");
        console.log(response.data.posts);
        setData(response.data);
        const postData = response.data.posts;
        setPosts(await getPost(postData));
        console.log("response set post done");
        console.log(posts);
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // Process the form submission here
    //     const response = await fetchDataa();
    //     const UserModel =
    //     {
    //         userName: response.userName,
    //         password: response.data.password,
    //         name: formData.name,
    //         email: formData.email,
    //         mobile: formData.mobile,
    //         address: formData.address,
    //         profileImageUri: response.data.profileImageUri,
    //         role: response.data.role,
    //         verified: response.data.verified
    //     }
    //     console.log(UserModel);


    //     const userResponse = await updateUser(authStatuss.userName, UserModel);
    //     console.log(userResponse);
    // }



    // async function fetchDataa() {

    //     const response = await fetchUserById(authStatuss.userName);

    //     setFormData((prevState) => ({
    //         ...prevState,
    //         ["userName"]: response.data.userName,
    //         ["name"]: response.data.name,
    //         ["mobile"]: response.data.mobile,
    //         ["email"]: response.data.email,
    //         ["address"]: response.data.address,
    //     }));
    //     return response;
    // }

    useEffect(() => {
        if (state && state.value) {
            console.log("entered state", { state });
            setLoading(true);
            fetchData(state.value).then(() => {
                setLoading(false);
            });
        }
    }, [state])
    return (
        < >
            <Box position="sticky" left={0} bottom={0} width="100%" display={{ base: "block", md: "none" }} zIndex={2}>
                <SideBar />
            </Box>
            <Flex backgroundImage={BackgroundImage} style={{ backgroundAttachment: 'fixed' }} height={"100vh"} overflowY={'hidden'}>

                <Tooltip label='Logout'>
                    <IconButton
                        position={'absolute'}
                        right={0}
                        top={0}
                        onClick={logout}
                        m={{ base: 2, md: 5 }}
                        mx={{ base: 2, md: 10 }}
                        icon={<AiOutlineLogout />}
                        colorScheme="white"
                        width={1}
                    >
                    </IconButton>
                </Tooltip>

                <Box position="sticky" left={0} top={0} height="100vh" width="300px" display={{ base: "none", md: "block" }}>
                    <SideBar />
                </Box>

                <Box p={{ base: 1, md: 4 }} width={"100%"} overflowY={'scroll'}>

                    <Loader></Loader>
                    <Flex alignItems="center" justifyContent="center" flexDirection="column" mb={4}>
                        <Avatar size="xl" name={state.value} src="/profile-photo.jpg" mb={2} mt={4} />
                        <Text fontSize="xl" fontWeight="bold">{state.value}</Text>
                        {authStatuss.userName != state.value ? (
                            <Button colorScheme="blue" size="sm" mt={2}>Follow</Button>
                        ) : (
                            <Button colorScheme="blue" size="sm" w={"100px"} mt={2} onClick={openModal}>Edit Profile</Button>
                        )}
                    </Flex>

                    <Flex justifyContent="space-around" mb={8}>
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

                    <Flex flexWrap="wrap" justifyContent="space-between" mx={{ base: 0, md: 3 }}>
                        {posts.length > 0 &&
                            posts.map((post, index) => (
                                <>
                                <Box
                                    key={index}
                                    bg="gray.200"
                                    flex={`0 0 calc((100% - (3 - 1) * 10px) /3)`} // calculate the width dynamically
                                    height={{base:"100px",md:"230px"}}
                                    boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                                    my={"5px"}
                                    onClick={() => handleViewDetails(post.postId)}
                                >
                                    <Image
                                        src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`}
                                        alt={post.caption}
                                        w="100%"
                                        h="100%"
                                        objectFit="cover"
                                    />
                                </Box>
                            </>
                            ))}
                               <Modal isOpen={isOpen} onClose={onClose} alignItems="center" justifyContent="center" motionPreset="none" top={"0%"} zIndex={900}>
                                <ModalOverlay />
                                <ModalContent
                                     position="absolute"
                                     top="-8%"
                                     left="40%"
                                >
                                    <ModalCloseButton />
                                    <ModalBody mt={5}>
                                      
                                            <Post key={postData.postId}
                                            post={postData}>
                                        </Post>
                                        
                                    </ModalBody>
                                </ModalContent>
                    </Modal>
                    </Flex>
                </Box>
                
            </Flex>
            {isModalOpen && <EditProfileModal closeModal={closeModal} userName={state.value} />}

           
            
        </>
    )
}

export default Profile