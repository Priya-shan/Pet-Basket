import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading, HStack, Flex, Spacer
} from '@chakra-ui/react';
import { staticFilesUrl,RAZOR_KEY } from '../../constants/contants';
import { authStatus } from "../../recoilAtoms/Auth"
import { Toast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { addVpdRequest } from '../../api/vpdRequest';
function VpdDetailsModal({ closeModal, post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);

    const handleClick = (selectedSlot, buttonId) => {
        console.log(buttonId);
        setSelectedButton(buttonId);
        setSelectedSlot(selectedSlot);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        closeModal();
    };
    async function submitVpdRequest() {
        const vpdRequestModel = {
            vpdId: post.pet.virtualPlayDate[0].vpdId,
            postId:post.postId,
            requesterUserName: authStatuss.userName,
            approverUserName: post.user.userName,
            slot: selectedSlot,
            vpdDate: new Date()
        }
        console.log(vpdRequestModel);
        const response = await addVpdRequest(vpdRequestModel);
        Toast("Virtual Play Date has been scheduled successfully !");
        console.log(response);
        handleClose();
    }
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
                amount: post.pet.virtualPlayDate[0].price * 100,
                currency: "INR",
                name: "Pet Basket",
                description: "Transaction",
                prefill: {
                    contact: "+919900000000",
                },
                handler: async function (res) {
                    await submitVpdRequest();
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
   
    useEffect(() => {
        handleOpen();
        console.log(post);
        console.log("Vpd Details Modal");
    }, []);
    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} size="4xl" maxHeight="200px" style={{ height: "100px" }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }}>
                        <Stack flex="1" alignItems="center" justifyContent="center">
                            <Image src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`} alt="Pet Image" style={{ height: '90%', width: 'auto' }} mr={2} />
                        </Stack>

                        <Stack flex="1" p="4">

                            <form fontSize="13px" >
                                <Stack spacing="1">
                                    <Text my={1} fontWeight={'bold'}>Pet Name : {post.pet.petName}</Text>
                                    <Text my={1}> Description : {post.pet.description}</Text>

                                    <Text my={1} >Slots Available</Text>
                                    <HStack>
                                        {post.pet.virtualPlayDate[0].vpdTimeSlot.map((element) => (
                                            <Button
                                                key={element.slotId}
                                                backgroundColor={selectedButton == element.slotId ? 'brand.500' : 'brand.100'}
                                                size="sm"
                                                onClick={() => handleClick(element.slotTime, element.slotId)}
                                            >
                                                {element.slotTime}
                                            </Button>
                                        ))}

                                    </HStack>
                                    <Text my={1} >Amount : ₹{post.pet.virtualPlayDate[0].price}</Text>
                                    <Text my={1} >Duration : {post.pet.virtualPlayDate[0].duration}</Text>
                                    <Flex alignItems={"center"}>
                                    {selectedButton > 0 && authStatuss.userName != post.user.userName ? (
                                                <Button fontSize="12px" mt="2" width={200} onClick={onPaymentRequest}>Pay & Book a Virtual Play Date</Button>
                                            ) : (
                                                <Button colorScheme='grey' disabled _hover={{ cursor: "none" }} bg={"grey"} fontSize="12px" mt="2" width={200}>Pay & Book a Virtual Play Date</Button>
                                            )}
                                        
                                    </Flex>
                                </Stack>
                            </form>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default VpdDetailsModal