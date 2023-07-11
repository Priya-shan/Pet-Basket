import React, { useState } from 'react';
import { Drawer, Text, Flex, Spacer, Input, DrawerBody, IconButton, Box, Avatar, Icon, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, List, ListItem, DrawerFooter } from '@chakra-ui/react';
import { authStatus, refreshComments } from '../../recoilAtoms/Auth';
import { addComment, deleteComment, fetchComments } from '../../api/comments';
// import { addReply, deleteReply } from '../api/replies';
import { useRecoilState } from "recoil";
import { MdDeleteOutline } from "react-icons/md"
import { useEffect } from 'react';
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchUsers } from '../../api/users';
import { useNavigate } from 'react-router-dom';

function SearchDrawer({ isOpen, onClose }) {

    const navigate = useNavigate();
    const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
    const [searchValue, setSearchValue] = useState("");
    const [userData, setUserData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);



    const handleInputChange = async (event) => {
        setSearchValue(event.target.value);
        const filteredUsers = userData.filter((user) =>
            user.userName.toLowerCase().startsWith(event.target.value.toLowerCase())
        );
        // const filteredUsernames = filteredUsers.map((user) => user.userName);
        setSearchResult(filteredUsers);
    };


    const fetchSearchResults = () => {
        console.log(searchValue);
    };

    async function fetchUsersList() {
        const response = await fetchUsers();
        setUserData(response.data);
    }

    useEffect(() => {
        // navigate("/");
        fetchUsersList();
    }, [])
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                        <InputGroup>
                            <Input
                                name="search"
                                type="text"
                                pr="4.5rem"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleInputChange} />
                            <InputRightElement width="4.5rem">
                                <SearchIcon color="black" onClick={fetchSearchResults} />
                            </InputRightElement>

                        </InputGroup>

                        <Box mt={4}>
                            {searchResult.map((user, index) => (
                                <Box key={index} display="flex" alignItems="center" py={2} 
                                cursor={'pointer'}
                                onClick={() => navigate("/profile", { state: { value: user.userName } })}
                                >
                                    <Avatar size="sm" name={user.userName} src={user.profileImageUri} mr={4} />
                                    <Text fontSize="md" fontWeight="medium">{user.userName}</Text>
                                </Box>
                            ))}
                        </Box>
                    </DrawerBody>
                    <DrawerFooter flexDirection={'column'}>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default SearchDrawer;