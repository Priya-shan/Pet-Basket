import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { authStatus, postsState } from "../../recoilAtoms/Auth";
import Post from "../../components/Post"
import AddPostModal from "../../components/AddPostModal"
import SideBar from "../../components/SideBar"
import { Center, Flex, Box, VStack, Button } from '@chakra-ui/react';
import BackgroundImage from "../../images/bg.png"
import { toast } from 'react-toastify';
import axios from "axios";
import { colors, baseUrl } from "../../constants/contants";
import PetDetailsModal from '../../components/PetDetailsModal';


function HomePage() {
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const [postsStatee, setPostsState] = useRecoilState(postsState);
  const [posts, setPosts] = useState([]);


  function logout() {
    localStorage.removeItem("username");
    console.log("logging out");
    setAuthStatus({ status: false, userName: '' });
  }
  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}/Posts`);
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      toast("🤐 An unknown error occurred... Try again!");
      console.log("An error occurred while making the request:", error);
    }
  }
  useEffect(() => {
    console.log("View Posts Page/Home Page");
    fetchData();
  }, [postsStatee]);

  return (
    <div >
        <Box position="sticky" left={0} bottom={0}  width="100%" display={{ base: "block", md: "none" }} zIndex={2}>
          <SideBar />
        </Box>
      <Flex backgroundImage={BackgroundImage} style={{ backgroundAttachment: 'fixed' }}>
        <Box position="sticky" left={0} top={0} height="100vh" width="300px" display={{ base: "none", md: "block" }}>
          <SideBar />
        </Box>
        <Box
          flex="1"
          overflowY="auto"
        >
          <Box justifyContent="center" alignItems="center">
            <VStack mt={8} justifyContent="center" alignItems="center" >
              {posts.map((post, index) => (
                <Post
                  key={post.postId}
                  post={post}
                  margin={20}
                />
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
      
      <Button onClick={logout}>Logout</Button>
    </div>

  );
}

export default HomePage;
