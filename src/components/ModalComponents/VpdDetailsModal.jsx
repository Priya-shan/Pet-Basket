import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading, HStack, Flex, Spacer
} from '@chakra-ui/react';
import { staticFilesUrl, RAZOR_KEY } from '../../constants/contants';
import { authStatus } from "../../recoilAtoms/Auth"
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { addVpdRequest } from '../../api/vpdRequest';
import { addMeeting } from '../../api/webexApi';
import axios from 'axios'
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
    async function createMeeting(startTime, endTime) {
        try {
            const accessToken = 'MmMwMGFjOWMtNWI3Yy00ZmU3LTlkOTItMjI5M2ZmNDU3NDgyYWZmMjVhZWEtMGJj_P0A1_f0bfbd13-cb41-469d-a2f8-31cc90ec7f7d';
            const meetingData = {
                title: 'My Meeting',
                start: startTime,
                end: endTime,
            };

            const response = await axios.post(
                'https://webexapis.com/v1/meetings',
                meetingData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data; 
        } catch (error) {
            return error;
        }
    }
    function convert12HourTo24Hour(time12hr) {
        const [time, modifier] = time12hr.split(' ');
      
        let [hours, minutes] = time.split(':');
        console.log("min ",minutes);
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
        minutes = minutes || '00';
        return {start: `${hours}:${minutes}`, end:  `${hours}:30`}
      }
    async function submitVpdRequest() {

        console.log(selectedSlot);
        const time24hr = convert12HourTo24Hour(selectedSlot);
        console.log(time24hr.start);
        console.log(time24hr.end);
        const vpdDate= new Date().toISOString();
        console.log(vpdDate);
        const startTime = `${vpdDate.slice(0, 10)}T${time24hr.start}`;
        const endTime = `${vpdDate.slice(0, 10)}T${time24hr.end}`;
        console.log(startTime," ",endTime);

        const meetingResponse =await createMeeting(startTime,endTime);
        console.log("meet res");
        console.log(meetingResponse);
        const vpdRequestModel = {
            vpdId: post.pet.virtualPlayDate[0].vpdId,
            postId:post.postId,
            requesterUserName: authStatuss.userName,
            approverUserName: post.user.userName,
            slot: selectedSlot,
            vpdDate: new Date(),
            meetingLink : meetingResponse.webLink,
        }
        console.log("vpd req model");
        console.log(vpdRequestModel);
        const response = await addVpdRequest(vpdRequestModel);
        console.log(response);
        toast("Virtual Play Date has been scheduled successfully !");
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
                theme: {
                    color: "#ebc8fd", // Set the desired color here
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