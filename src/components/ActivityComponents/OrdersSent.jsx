import React, { useEffect,useState} from 'react'
import { Box, Flex, Text, Image, IconButton, useDisclosure,Badge, Modal,Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra } from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai"
import CardImage from "../../images/CardImage.png"
import { staticFilesUrl } from "../../constants/contants"
import { useNavigate } from 'react-router-dom';
import { fetchPostById } from '../../api/posts';
import Post from '../IndividualComponents/Post';
import EmptyComponent from './EmptyComponent';
import{ BsFillBagFill} from "react-icons/bs"

function OrdersSent({data}) {
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
    {data && Array.isArray(data.sentOrders) && data.sentOrders.length > 0 ? (
  data.sentOrders.map((item) => (
    <Flex
      key={item.orderId}
      alignItems="center"
      borderBottom="1px solid"
      p={5}
      borderColor="gray.200"
      justifyContent="space-around"
      width="100%"
    >
      <Box mr={4}>
        <BsFillBagFill size={24} />
      </Box>
      <Box>
        <Text fontSize={{base:"12px",md:"15px"}}>
          Order Placed Successfully - 
          <chakra.strong
            cursor="pointer"
            onClick={() => navigate("/user-profile")}
          >
            {" "+item.productName}
          </chakra.strong>
        </Text>
      </Box>
      <Image
        src={`${staticFilesUrl}/posts/${item.postId}${item.imageUri}`}
        alt={item.productName}
        boxSize="64px"
        borderRadius="md"
        objectFit="cover"
        mr={4}
      />
       <Box >
                <Flex 
                  key={item.vpdRequestId}
                  flexDirection={{ base: 'column', lg: 'row' }}
                  alignItems={{ base: 'center', lg: 'flex-start' }}
                  justifyContent={{ base: 'center', lg: 'space-around' }}
                  
                >
      <IconButton
        aria-label="View Details"
        icon={<FaRegEye />}
        colorScheme="brand"
        w={2}
        mx={4}
        onClick={() => handleViewDetails(item.postId)}
      />
      <Button size={"sm"} mx={4}>Cancel</Button>
      <Badge colorScheme='purple' mx={4} display={'flex'} alignItems={'center'} mt={2}>In Progress</Badge>
      </Flex>
      </Box>
      {/* <Badge colorScheme='green'>Completed</Badge>
      <Badge colorScheme='red'>Cancelled</Badge> */}

    </Flex>
  ))
) : (
  <EmptyComponent message="You haven't placed any orders 👀"/> // Replace with the component you want to render when data.sentAdoptionEnquiries is empty
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

export default OrdersSent