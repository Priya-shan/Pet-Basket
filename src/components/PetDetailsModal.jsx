import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading} from '@chakra-ui/react';
import cardImage from "../images/CardImage.png"
import CustomInput from './ChakraComponents/CustomInput';
import { staticFilesUrl } from '../constants/contants';
function PetDetailsModal({ closeModal, post}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission here
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleOpen();
    console.log("Pet Details Modal");
    console.log("post id"+post.postId);
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="6xl" maxHeight="200px" style={{ height: "100px" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody display="flex" flexDirection={{base:"column", md:"row"}}>
            <Stack flex="1" alignItems="center" justifyContent="center">
              <Image src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`} alt="Pet Image" style={{ height: '150px', width: 'auto' }} />
              <Text fontSize={'2xl'} fontWeight={'bold'}>{post.pet.petName}</Text>
              <Text px={6}>{post.pet.description}</Text>
              <Stack textAlign="center" mt="4" fontSize="sm">
                <Text fontSize="sm" textAlign="center" px={6}>
                  **Please note that this inquiry form is for information purposes only and does not guarantee pet adoption.**
                </Text>
              </Stack>
            </Stack>

            <Stack flex="1" p="4">

              <form onSubmit={handleSubmit} fontSize="13px" >
                <Stack spacing="1">
                  <FormControl id="name" isRequired>
                    <FormLabel fontSize="12px">Name:</FormLabel>
                    <CustomInput type="text"  onChange={handleInputChange}/>
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="12px">Email:</FormLabel>
                    <CustomInput type="email" onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="phone" isRequired>
                    <FormLabel fontSize="12px">Phone Number:</FormLabel>
                    <CustomInput type="tel" onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="address" isRequired>
                    <FormLabel fontSize="12px">Address:</FormLabel>
                    <CustomInput type="text"  onChange={handleInputChange}/>
                  </FormControl>

                  <FormControl id="message" isRequired>
                    <FormLabel fontSize="12px">Message:</FormLabel>
                    <Textarea  size={'sm'} border="2px" borderColor="brand.900" boxShadow='none' _focus={{ boxShadow: 'none', borderColor: 'brand.900' }} _hover={{ borderColor: 'brand.900' }} onChange={handleInputChange}/>
                  </FormControl>

                  <Button type="submit" fontSize="12px" mt="2">Submit Enquiry</Button>
                </Stack>
              </form>

            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PetDetailsModal;
