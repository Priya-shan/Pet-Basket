import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading, HStack,Spacer,Flex, Center
} from '@chakra-ui/react';
import CustomInput from './ChakraComponents/CustomInput';
import { staticFilesUrl } from '../constants/contants';
function VpdDetailsModal({ closeModal, post}) {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setquantity] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        quantity: '',
        amount: '',
      });

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        closeModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name==="quantity"){
            setquantity(value);
        }
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    useEffect(() => {
        handleOpen();
        console.log("Vpd Details Modal");
    }, []);
    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} size="6xl" maxHeight="200px" style={{ height: "100px" }}  >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }}>
                            <Stack flex="1" alignItems="center" justifyContent="center">
                                <Image src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`} alt="Pet Image" style={{ height: '150px', width: 'auto' }} />
                                <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'} m={0}>{post.product.productName} - ₹{post.product.price}</Text>
                                <Text px={6}>{post.product.Description}</Text>
                            </Stack>

                            <Stack flex="1" p="4">

                                <form fontSize="13px" >
                                    <Stack spacing="1">
                                        <FormControl id="name" isRequired>
                                            <FormLabel fontSize="12px">Name:</FormLabel>
                                            <CustomInput type="text" onChange={handleInputChange}/>
                                        </FormControl>

                                        <FormControl id="email" isRequired>
                                            <FormLabel fontSize="12px">Email:</FormLabel>
                                            <CustomInput type="email" onChange={handleInputChange} />
                                        </FormControl>

                                        <FormControl id="phone" isRequired>
                                            <FormLabel fontSize="12px">Phone Number:</FormLabel>
                                            <CustomInput type="tel" onChange={handleInputChange}/>
                                        </FormControl>

                                        <FormControl id="address" isRequired>
                                            <FormLabel fontSize="12px">Address:</FormLabel>
                                            <CustomInput type="text" onChange={handleInputChange}/>
                                        </FormControl>

                                        <FormControl id="quantity" isRequired>
                                            <FormLabel fontSize="12px">Quantity:</FormLabel>
                                            <CustomInput type="number" onChange={handleInputChange}/>
                                        </FormControl>
                                            <Flex alignItems={"center"}>
                                            <Text>Total Amount : ₹{quantity * post.product.price}</Text>
                                            <Spacer></Spacer>
                                            <Button type="submit" fontSize="12px" mt="2">Pay & Place Order</Button>
                                            </Flex>
                                    </Stack>
                                </form>
                            </Stack>
                        </ModalBody>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default VpdDetailsModal