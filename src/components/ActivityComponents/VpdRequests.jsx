import React, { useEffect, useState } from 'react'
import { authStatus } from '../../recoilAtoms/Auth';
import { useRecoilState } from 'recoil';
import { fetchVpdRequests } from '../../api/vpdRequest';
import { FaPaw } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { Box, Flex, Text, Image, IconButton, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra, Button, HStack } from "@chakra-ui/react";
import EmptyComponent from './EmptyComponent';
import { fetchPostById } from '../../api/posts';
import Post from '../IndividualComponents/Post';
function VpdRequests() {
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState([]);
  const handleViewDetails = async (postId) => {
    await fetchPostData(postId);
    onOpen();
  };
  async function fetchPostData(postId) {
    const response = await fetchPostById(postId);
    setPostData(response.data);
  }
  async function fetchData() {
    const response = await fetchVpdRequests();
    const filteredResponseRequester = response.data.filter(item => item.requesterUserName === authStatuss.userName);
    const filteredResponseApprover = response.data.filter(item => item.approverUserName === authStatuss.userName);
    const combinedResponse = filteredResponseRequester.concat(filteredResponseApprover);
    setData(combinedResponse);

  }
  async function showPetDetail() {

  }
  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <Box mt={10} px={"20px"} py={"5px"}
      >
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Flex
              key={item.vpdRequestId}
              borderRadius={10}
              // bgColor={'brand.100'}
              bgColor="rgb(248, 237, 254, 0.8)"
              mx={0}
              alignItems="center"
              borderBottom="1px solid"
              py={3}
              borderColor="gray.200"
              px={5}
              justifyContent="start"
              width="100%"
              onClick={showPetDetail}
            >

              <Box flex="4" pt={2} >
                <Text fontSize={{base:"12px",md:"15px"}}>
                  A Virtual Play Date has been scheduled with{' '}
                  <Text as="span" fontWeight="bold" _hover={{ cursor: "pointer" }}>
                    {item.requesterUserName === authStatuss.userName
                      ? item.approverUserName
                      : item.requesterUserName}
                  </Text>
                </Text>
              </Box>
              <Box flex="4">
                <Flex 
                  key={item.vpdRequestId}
                  flexDirection={{ base: 'column', lg: 'row' }}
                  alignItems={{ base: 'center', lg: 'flex-start' }}
                  justifyContent={{ base: 'center', lg: 'space-around' }}
                  
                >
                  <Box flex="1" pt={2} display="flex" justifyContent="center" mx={3}>
                    <Badge colorScheme="purple" >12-03-2023</Badge>
                  </Box>
                  <Box flex="1" pt={2}  mx={3}display="flex" justifyContent="center">
                    <Badge colorScheme="purple">
                      {item.requesterUserName === authStatuss.userName ? 'Viewing' : 'Showcasing'}
                    </Badge>
                  </Box>
                  <Box flex="1" pt={2} mx={3} display="flex" justifyContent="center">
                    <Badge colorScheme="purple">
                      {item.requesterUserName === authStatuss.userName ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </Box>
                </Flex>

              </Box>
              <Box flex="1" >
                <Flex key={item.vpdRequestId}
                  flexDirection={{ base: 'column', lg: 'row' }}
                  alignItems={{ base: 'center', lg: 'flex-start' }}
                  justifyContent={{ base: 'center', lg: 'flex-start' }}>
                  <Box flex="1" display={'flex'} justifyContent={'center'} pt={2}>
                    <IconButton
                      aria-label="View Details"
                      icon={<FaPaw />}
                      colorScheme="brand"
                      w={2}
                      onClick={() => { handleViewDetails(item.postId) }}
                    />
                  </Box>
                  <Box flex="1" display={'flex'} justifyContent={'center'} pt={2}>
                    <IconButton
                      aria-label="View Details"
                      icon={<BsFillCameraVideoFill />}
                      colorScheme="brand"
                      w={2}
                    />
                  </Box>
                </Flex>
              </Box>

            </Flex>

          ))
        ) : (
          <EmptyComponent message="No Virtual Play Dates History! 👀" />
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
export default VpdRequests