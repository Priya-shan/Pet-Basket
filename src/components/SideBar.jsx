import { Box, VStack, HStack, Icon, Text,IconButton,Flex } from '@chakra-ui/react';
import { FaHome, FaPlus, FaBell, FaBookmark, FaUser, FaQuestion, FaRobot } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import SideBarElement from './SideBarElements';
import { useNavigate } from 'react-router-dom';
import AddNewPost from './AddPostModal'
import { useState } from 'react';
// onClick={()=> navigate("/SignUp")}
const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("entered open modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box bg="brand.300" w="300px" h="100vh" borderRadius="0px 30px 30px 0px" display={{ base: "none", md: "block" }}>
        <VStack spacing="20px" align="stretch" p={8}>
          <Text fontSize={20} fontWeight={"bolder"} textAlign={'center'} fontFamily="cursive">Pet Basket</Text>
          <SideBarElement name="Home" iconName={FaHome}></SideBarElement>
          <SideBarElement name="New Post" iconName={FaPlus} onClick={openModal}></SideBarElement>
          <SideBarElement name="I-Request" iconName={FaQuestion} ></SideBarElement>
          <SideBarElement name="Notifications" iconName={FaBell}></SideBarElement>
          <SideBarElement name="Saved Item" iconName={FaBookmark}></SideBarElement>
          <SideBarElement name="AMA-Pets" iconName={MdMessage}></SideBarElement>
          <SideBarElement name="Profile" iconName={FaUser}></SideBarElement>
        </VStack>
      </Box>

      <Flex
        bg="brand.300"
        w="100%"
        p={2}
        pos="fixed"
        bottom={0}
        left={0}
        display={{ base: "flex", md: "none" }}
        justifyContent="space-around"
      >
        <IconButton
          aria-label="Home"
          icon={<FaHome />}
          colorScheme="white"
          width={1}
        />
       
        <IconButton
          aria-label="I-Request"
          icon={<FaQuestion />}
          colorScheme="white"
          width={1}
        />
        <IconButton
          aria-label="Notifications"
          icon={<FaBell />}
          colorScheme="white"
          width={1}
        />
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
        />
      </Flex>

      {isModalOpen && <AddNewPost closeModal={closeModal} />}
    </>
  );
};

export default Sidebar;
