import React, { useEffect } from 'react'
import { Box, Flex, Text, Image, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai"
import CardImage from "../../images/CardImage.png"
import { staticFilesUrl } from "../../constants/contants"
import { useNavigate } from 'react-router-dom';
import EmptyComponent from './EmptyComponent';
function EnquiriesReceived({data}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEnquiry, setSelectedEnquiry] = React.useState(null);
  const navigate = useNavigate();
  const handleViewDetails = (pet) => {
    setSelectedEnquiry(pet);
    onOpen();
  };
  useEffect(()=>{
    if(data && data.receivedAdoptionEnquiries)
    console.log(data.receivedAdoptionEnquiries);
  },[])
  return (
    
    <Box mt={10}>
{data && Array.isArray(data.receivedAdoptionEnquiries) && data.receivedAdoptionEnquiries.length > 0 ?(
  data.receivedAdoptionEnquiries.map((item) => (
    <Flex
      key={item.enquiryId}
      alignItems="center"
      borderBottom="1px solid"
      pb={5}
      borderColor="gray.200"
      px={20}
      justifyContent="space-around"
      width="100%"
    >
      <Box mr={4}>
        <FaPaw size={24} />
      </Box>
      <Box>
        <Text>
          <chakra.strong cursor="pointer" onClick={() => navigate("/user-profile")}>
            {item.buyerUserName}
          </chakra.strong>{" "}
          is interested to enquire about your pet{" "}
          <chakra.strong cursor="pointer" onClick={() => navigate("/user-profile")}>
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
        icon={<AiOutlineUser />}
        colorScheme="brand"
        w={2}
        onClick={() => handleViewDetails(item)}
      />
    </Flex>
  ))
) : (
  <EmptyComponent message={"You haven't received any Enquiries yet !👀"}/>
)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEnquiry && (
              <Box>
                <Text>
                  <strong>Name:</strong> {selectedEnquiry.buyerUser.name}
                </Text>
                <Text>
                  <strong>Mobile:</strong> {selectedEnquiry.buyerUser.mobile}
                </Text>
                <Text>
                  <strong>Email:</strong> {selectedEnquiry.buyerUser.email}
                </Text>
                <Text>
                  <strong>Address:</strong> {selectedEnquiry.buyerUser.address}
                </Text>
                <Text>
                  <strong>Message:</strong> {selectedEnquiry.message}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {/* Add additional buttons or actions as needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default EnquiriesReceived