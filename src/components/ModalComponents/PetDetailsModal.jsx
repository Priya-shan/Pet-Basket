import React, { useState, useEffect } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
  FormControl, FormLabel, Input, Textarea, Image, Text, Heading
} from '@chakra-ui/react';
import cardImage from "../../images/CardImage.png"
import CustomInput from '../ChakraComponents/CustomInput';
import { staticFilesUrl } from '../../constants/contants';
import { authStatus } from "../../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import { updateUser, fetchUserById } from '../../api/users';
import { addEnquiry } from '../../api/adoptionEnquiries';
import { toast } from 'react-toastify';
import {Toast} from "@chakra-ui/react"
function PetDetailsModal({ closeModal, post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(authStatus);
    // Process the form submission here
    const response = await fetchData();
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

    const EnquiryModel = {
      buyerUserName: authStatuss.userName,
      sellerUserName: post.user.userName,
      petId: post.pet.petId,
      message: formData.message,
      createdAt: new Date()
    }
    console.log(EnquiryModel);
    const enquiryResponse = await addEnquiry(EnquiryModel);
    console.log(enquiryResponse);
    Toast("Adoption enquiry sent successfully !")
    handleClose();
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

  async function fetchData() {
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
    handleOpen();
    console.log("Pet Details Modal");
    console.log("post id" + post.postId);
    fetchData();

  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="6xl" maxHeight="200px" style={{ height: "100px" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }}>
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
                    <CustomInput type="text" name="name" value={formData.name} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="12px">Email:</FormLabel>
                    <CustomInput type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="phone" isRequired>
                    <FormLabel fontSize="12px">Phone Number:</FormLabel>
                    <CustomInput type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="address" isRequired>
                    <FormLabel fontSize="12px">Address:</FormLabel>
                    <CustomInput type="text" name="address" value={formData.address} onChange={handleInputChange} />
                  </FormControl>

                  <FormControl id="message" isRequired>
                    <FormLabel fontSize="12px">Message:</FormLabel>
                    <Textarea size={'sm'} name="message" border="2px" value={formData.message} borderColor="brand.900" boxShadow='none' _focus={{ boxShadow: 'none', borderColor: 'brand.900' }} _hover={{ borderColor: 'brand.900' }} onChange={handleInputChange} />
                  </FormControl>
                  {authStatuss.userName != post.user.userName ? (
                    <Button type="submit" fontSize="12px" mt="2">Pay & Place Order</Button>
                  ) : (
                    <Button colorScheme='grey' disabled _hover={{ cursor: "none" }} bg={"grey"} fontSize="12px" mt="2">Pay & Place Order</Button>
                  )}
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
