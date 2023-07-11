import { Box, VStack, HStack, Icon, Text,IconButton,Flex } from '@chakra-ui/react';
import { FaHome, FaPlus, FaBell, FaBookmark, FaUser, FaQuestion, FaRobot, FaDash, FaSearch} from 'react-icons/fa';
import {FiActivity} from 'react-icons/fi'
import { MdMessage } from 'react-icons/md';
import SideBarElement from './SideBarElements';
import { useNavigate } from 'react-router-dom';
import AddNewPost from '../ModalComponents/AddPostModal'
import { useState } from 'react';
import { useRecoilState } from "recoil";
import { authStatus, postsState } from "../../recoilAtoms/Auth";
import SearchDrawer from '../DrawerComponents/SearchDrawer'; 
// onClick={()=> navigate("/SignUp")}
const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openModal = () => {
    console.log("entered open modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSearchDrawer = () => {
    console.log("entered open search drawer");
    setIsDrawerOpen(true);
  };

  const closeSearchDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box bg="brand.300" w="300px" h="100vh" textAlign={'center'} borderRadius="0px 30px 30px 0px" display={{ base: "none", md: "block" }}>
        <VStack spacing="20px" align="stretch" p={8}>
          <Text fontSize={20} fontWeight={"bolder"} textAlign={'center'} fontFamily="cursive"  mb={"30px"}>Pet Basket</Text>
          <SideBarElement name="Home" iconName={FaHome} onClick={()=> navigate("/")}></SideBarElement>
          <SideBarElement name="Search" iconName={FaSearch} onClick={openSearchDrawer}></SideBarElement>
          <SideBarElement name="New Post" iconName={FaPlus} onClick={openModal}></SideBarElement>
          <SideBarElement name="My Activities" iconName={FiActivity} 
            onClick={() => navigate("/activities")}>
            </SideBarElement>
          {/* <SideBarElement name="Notifications" iconName={FaBell}></SideBarElement> */}
          <SideBarElement name="Saved Item" iconName={FaBookmark}></SideBarElement>
          
          <SideBarElement name="Profile" iconName={FaUser} onClick={() => navigate("/profile", { state: { value: authStatuss.userName } })}></SideBarElement>
        </VStack>
      </Box>
      <Flex
        display={{ base: "flex", md: "none" }}
        bg="brand.300"
        w="100%"
        p={2}
        pos="fixed"
        bottom={0}
        left={0}
        justifyContent="space-around"
        mt={"50px"}
      >
        <IconButton
          aria-label="Home"
          icon={<FaHome />}
          colorScheme="white"
          width={1}
          onClick={()=> navigate("/")}
        />
       
        <IconButton
          aria-label="I-Request"
          icon={<FaQuestion />}
          colorScheme="white"
          width={1}
          onClick={() => navigate("/activities")}>
          </IconButton>

        {/* <IconButton
          aria-label="Notifications"
          icon={<FaBell />}
          colorScheme="white"
          width={1}
        /> */}

         <IconButton
          aria-label="New Post"
          icon={<FaPlus />}
          colorScheme="white"
          onClick={openModal}
          width={1}
        />
        <IconButton
          aria-label="Saved Item"
          icon={<FaBookmark />}
          colorScheme="white"
          width={1}
        />
        <IconButton
          aria-label="AMA-Pets"
          icon={<MdMessage />}
          colorScheme="white"
          width={1}
        />
        <IconButton
          aria-label="Profile"
          icon={<FaUser />}
          colorScheme="white"
          width={1}
          onClick={() => navigate("/profile", { state: { value: authStatuss.userName } })}
        />
      </Flex>

      {isModalOpen && <AddNewPost closeModal={closeModal} />}
      {isDrawerOpen && <SearchDrawer  isOpen={isDrawerOpen} onClose={closeSearchDrawer} />}
    </>
  );
};

export default Sidebar;
