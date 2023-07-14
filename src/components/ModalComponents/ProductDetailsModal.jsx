import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading, HStack, Spacer, Flex, Center
} from '@chakra-ui/react';
import CustomInput from '../ChakraComponents/CustomInput';
import { staticFilesUrl,RAZOR_KEY } from '../../constants/contants';
import { authStatus } from "../../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import { updateUser, fetchUserById } from '../../api/users';
import { addOrder } from '../../api/orders';
import {Toast} from "@chakra-ui/react";
function VpdDetailsModal({ closeModal, post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setquantity] = useState(1);
    const [amount, setAmount] = useState(post.product.price);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        quantity: '',
        amount: '',
    });
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);

    function loadScript(src) {
        console.log("on load script");
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function onPaymentRequest() {
        console.log("on payment request");
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            console.log("entered try");
            const options = {
                key: RAZOR_KEY,
                amount: amount * 100,
                currency: "INR",
                name: "Pet Basket",
                description: "Transaction",
                handler: async function (res) {
                    await placeOrder();
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                console.log("Non-Axios Error:", error);
            }
        }
    }
    async function placeOrder(){
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

        const orderModel = {
            buyerUserName: authStatuss.userName,
            sellerUserName: post.user.userName,
            productId: post.product.productId,
            quantity: formData.quantity,
            amount: amount,
            paymentMode: "online",
            paymentStatus: "success",
            orderStatus: "pending",
            createdAt: new Date()
        }
        console.log(orderModel);
        const orderResponse = await addOrder(orderModel);
        console.log(orderResponse);
        Toast("Order placed Successfully !");
        
        handleClose();
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
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        closeModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name + " " + value);
        if (name === "quantity") {
            console.log("updating price !!");
            console.log(value);
            console.log(value * (post.product.price));
            setAmount(value * (post.product.price));
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        handleOpen();
        console.log("Vpd Details Modal");
        fetchData();
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
                                <Text px={6}>{post.product.description}</Text>
                            </Stack>

                            <Stack flex="1" p="4">

                                <form fontSize="13px" >
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

                                        <FormControl id="quantity" isRequired>
                                            <FormLabel fontSize="12px">Quantity:</FormLabel>
                                            <CustomInput type="number" value={formData.quantity} name="quantity" onChange={handleInputChange} />
                                        </FormControl>
                                        <Flex alignItems={"center"}>
                                            <Text>Total Amount : ₹{amount}</Text>
                                            <Spacer></Spacer>
                                            {formData.quantity > 0 && authStatuss.userName != post.user.userName ? (
                                                <Button onClick={onPaymentRequest} fontSize="12px" mt="2">Pay & Place Order</Button>
                                            ) : (
                                                <Button colorScheme='grey' disabled _hover={{ cursor: "none" }} bg={"grey"} fontSize="12px" mt="2">Pay & Place Order</Button>
                                            )}
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