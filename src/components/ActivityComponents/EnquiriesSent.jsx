import React, { useEffect,useState} from 'react'
import { Box, Flex, Text, Image, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai"
import CardImage from "../../images/CardImage.png"
import { staticFilesUrl } from "../../constants/contants"
import { useNavigate } from 'react-router-dom';
import { fetchPostById } from '../../api/posts';
import Post from '../IndividualComponents/Post';
import EmptyComponent from './EmptyComponent';

function EnquiriesSent({data}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const  handleViewDetails =async (postId) =>  {
    await fetchData(postId);
    onOpen();
  };
  async function fetchData(postId){
    const response=await fetchPostById(postId);
    setPostData(response.data);
  }
  useEffect(()=>{
    
  },[])
  return (
    <>
    <Box mt={10}>
    {data && Array.isArray(data.sentAdoptionEnquiries) && data.sentAdoptionEnquiries.length > 0 ? (
  data.sentAdoptionEnquiries.map((item) => (
    <Flex
      key={item.enquiryId}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.200"
      p={5}
      justifyContent="space-around"
      width="100%"
    >
      <Box mr={4}>
        <AiOutlineUser size={24} />
      </Box>
      <Box>
        <Text fontSize={{base:"12px",md:"15px"}}>
          You sent a request to enquire about{" "}
          <chakra.strong
            cursor="pointer"
            onClick={() => navigate("/user-profile")}
          >
            {item.pet.petName}
          </chakra.strong>
        </Text>
      </Box>
      <Image
        src={`${staticFilesUrl}/posts/${item.pet.post.postId}${item.pet.post.imageUri}`}
        alt={item.pet.petName}
        boxSize="64px"
        borderRadius="md"
        objectFit="cover"
        mr={4}
      />
      <IconButton
        aria-label="View Details"
        icon={<FaPaw />}
        colorScheme="brand"
        w={2}
        onClick={() => handleViewDetails(item.pet.post.postId)}
      />
    </Flex>
  ))
) : (
  <EmptyComponent message="You havent sent any Enquiries yet 👀"/> // Replace with the component you want to render when data.sentAdoptionEnquiries is empty
)}

</Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={5}>
            <Post key={postData.postId}
                  post={postData}>
                  </Post>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
  )
}

export default EnquiriesSent