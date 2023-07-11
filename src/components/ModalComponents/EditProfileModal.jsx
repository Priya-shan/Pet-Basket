import React, { useState, useEffect } from 'react'
import { Modal, ModalOverlay, HStack, ModalContent, ModalHeader, Button, ModalBody, Flex, ModalCloseButton, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import CustomInput from '../ChakraComponents/CustomInput';
import { fetchUserById, updateUser } from '../../api/users';
import { authStatus, postsState, loader } from "../../recoilAtoms/Auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toast } from 'react-toastify';
function EditProfileModal({ closeModal, userName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const setLoading = useSetRecoilState(loader);
    const [isEditable, setIsEditable] = useState(false);

    const [formData, setFormData] = useState({
        userName: '',
        name: '',
        email: '',
        mobile: '',
        address: '',
        message: '',
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
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    async function updateProfile() {
        const response = await fetchUserById(userName);
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
        toast("✔ Profile Updated Succesfully");
    }
    
    async function fetchData(userName) {
        const response = await fetchUserById(userName);
        setFormData((prevState) => ({
            ...prevState,
            ["userName"]: response.data.userName,
            ["name"]: response.data.name,
            ["mobile"]: response.data.mobile,
            ["email"]: response.data.email,
            ["address"]: response.data.address,
        }));
        return response;
    }
    useEffect(() => {
        handleOpen();
        fetchData(userName)
        console.log("Edit Profile Modal");
    }, []);
    return (

        <Modal isOpen={isOpen} onClose={handleClose} size="6xl" maxHeight="200px">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>

                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="scroll" maxHeight="65vh">
                    <Stack spacing={4} mb={4}>
                        <HStack>

                            <FormControl id="name" >
                                <FormLabel fontSize="12px">Name:</FormLabel>
                                <CustomInput type="text" name="name" isDisabled={!isEditable} value={formData.name} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl id="email" >
                                <FormLabel fontSize="12px">Email:</FormLabel>
                                <CustomInput type="email" name="email" isDisabled={!isEditable} value={formData.email} onChange={handleInputChange} />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="phone" >
                                <FormLabel fontSize="12px">Phone Number:</FormLabel>
                                <CustomInput type="tel" name="mobile" isDisabled={!isEditable} value={formData.mobile} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl id="address" >
                                <FormLabel fontSize="12px">Address:</FormLabel>
                                <CustomInput type="text" name="address" isDisabled={!isEditable} value={formData.address} onChange={handleInputChange} />
                            </FormControl>

                        </HStack>
                    </Stack>

                    <Flex justifyContent="flex-end" mb={4}>
                        <Button colorScheme="blue" size="sm" mr={2} onClick={() => setIsEditable(true)}>Edit</Button>
                        <Button colorScheme="green" type='submit' size="sm" onClick={updateProfile}>Update</Button>
                    </Flex>
                </ModalBody>

            </ModalContent>
        </Modal >

    )
}

export default EditProfileModal