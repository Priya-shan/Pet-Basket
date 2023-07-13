import React, { useEffect, useState } from 'react'
import { Box, Grid, GridItem, Image, Text,Flex, useDisclosure,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody} from "@chakra-ui/react";
import { fetchSavedPosts } from '../../api/savedpost';
import { fetchPostById } from '../../api/posts';
import { authStatus } from '../../recoilAtoms/Auth';
import { useRecoilState } from 'recoil';
import { staticFilesUrl } from '../../constants/contants';
import SideBar from '../../components/SidebarComponents/SideBar';
import BackgroundImage from "../../images/bg.png";
import Post from '../../components/IndividualComponents/Post';
function SavedItems() {
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const [savedItems, setSavedItems] = useState([]);
    const [postData, setPostData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    async function fetchData() {
        const response = await fetchSavedPosts();
        const filteredData = response.data.filter((item) => item.userName === authStatuss.userName);
        setSavedItems(filteredData);
        console.log(filteredData);
    }
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
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Box position="sticky" left={0} bottom={0} width="100%" display={{ base: "block", md: "none" }} zIndex={2}>
                <SideBar />
            </Box>
            <Flex flexDirection={'row'} >
                <Box position="sticky" left={0} top={0} height="100vh" width="300px" display={{ base: "none", md: "block" }}>
                    <SideBar />
                </Box>
                <Box p={4}>
                    <Text fontWeight={'bolder'} fontSize={"20px"} m={2}>My Saves</Text>
                <Flex flexWrap="wrap" justifyContent="space-between" mx={{ base: 0, md: 3 }}>
                    
                        {savedItems.length > 0 &&
                            savedItems.map((item, index) => (
                                <>
                                <Box
                                    key={index}
                                    bg="gray.200"
                                    flex={`0 0 calc((100% - (3 - 1) * 10px) /3)`} // calculate the width dynamically
                                    
                                    boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                                    my={"5px"}
                                    onClick={() => handleViewDetails(item.post.postId)}
                                >
                                    <Image
                                        src={`${staticFilesUrl}/posts/${item.post.postId}${item.post.imageUri}`}
                                        alt={item.post.caption}
                                        w="100%"
                                        height={{base:"100px",md:"230px"}}
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
        </>
    )
}

export default SavedItems