import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack,
    FormControl, FormLabel, Input, Textarea, Image, Text, Heading, HStack, Flex, Spacer
} from '@chakra-ui/react';
import { staticFilesUrl } from '../constants/contants';
function VpdDetailsModal({ closeModal, post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('');

    const handleClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        closeModal();
    };
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
                                                backgroundColor={selectedButton === element.slotId ? 'brand.500' : 'brand.100'}
                                                size="sm"
                                                onClick={() => handleClick(`${element.slotId}`)}
                                            >
                                                {element.slotTime}
                                            </Button>
                                        ))}

                                    </HStack>
                                    <Text my={1} >Amount : ₹{post.pet.virtualPlayDate[0].price}</Text>
                                    <Text my={1} >Duration : {post.pet.virtualPlayDate[0].duration}</Text>
                                    <Flex alignItems={"center"}>
                                        <Button type="submit" fontSize="12px" mt="2" width={200}>Pay & Book a Virtual Play Date</Button>
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