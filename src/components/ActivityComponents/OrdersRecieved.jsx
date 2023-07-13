import React, { useEffect } from 'react'
import { Box, Flex, Text, Image, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra, Button } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import{ BsFillBagFill} from "react-icons/bs"
import {AiOutlineUser} from "react-icons/ai"
import { staticFilesUrl } from "../../constants/contants"
import { useNavigate } from 'react-router-dom';
import EmptyComponent from '../ActivityComponents/EmptyComponent';
function OrdersReceived({data}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const navigate = useNavigate();
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    onOpen();
  };
  useEffect(()=>{
    console.log("orders recv");
    console.log(data);
    if(data && data.receivedOrders)
    console.log(data.receivedOrders);
  },[])
  return (
    
    <Box mt={10}>
{data && Array.isArray(data.receivedOrders) && data.receivedOrders.length > 0 ?(
  data.receivedOrders.map((item) => (
    <Flex
      key={item.enquiryId}
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
        <Text>
          An order received from  
          <chakra.strong cursor="pointer" onClick={() => navigate("/user-profile")}>
            {" "+item.buyerUserName}
          </chakra.strong>{" "}
           for the product 
          <chakra.strong cursor="pointer" onClick={() => navigate("/user-profile")}>
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
      <IconButton
        aria-label="View Details"
        icon={<AiOutlineUser />}
        colorScheme="brand"
        w={2}
        onClick={() => handleViewDetails(item)}
      />
      <Button size={'sm'} fontSize={10} w={100}>Complete Order</Button>
    </Flex>
  ))
) : (
  <EmptyComponent message={"You haven't received any Orders yet !👀"}/>
)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProduct && (
              <Box>
                <Text>
                  <strong>Name:</strong> {selectedProduct.name}
                </Text>
                <Text>
                  <strong>Mobile:</strong> {selectedProduct.mobile}
                </Text>
                <Text>
                  <strong>Email:</strong> {selectedProduct.email}
                </Text>
                <Text>
                  <strong>Address:</strong> {selectedProduct.address}
                </Text>
                <Text>
                  <strong>Quantity:</strong> {selectedProduct.quantity}
                </Text>
                <Text>
                  <strong>Amount:</strong> {selectedProduct.amount}
                </Text>
                <Text>
                  <strong>Payment Mode:</strong> {selectedProduct.paymentMode}
                </Text>
                <Text>
                  <strong>Payment Status:</strong> {selectedProduct.paymentStatus}
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

export default OrdersReceived