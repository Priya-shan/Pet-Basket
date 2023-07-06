import React, { useEffect,useState } from 'react';
import { Box, Flex, Avatar, IconButton, Icon, Text, Center, Image, Menu, MenuButton, MenuList, MenuItem, Spacer, Button, HStack } from '@chakra-ui/react';
import { FaHeart, FaComment, FaShare, FaSave, FaEllipsisV, FaTrash } from 'react-icons/fa';
import { staticFilesUrl } from "../constants/contants"
import { deletePost } from '../api/posts';
import { postsState } from "../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import PetDetailsModal from './PetDetailsModal';
import VpdDetailsModal from './VpdDetailsModal';
import ProductDetailsModal from "./ProductDetailsModal";

function liked() {
  alert("liked");
}

function Post(props) {
  const {
    post,
    margin
  } = props;
  const [postsStatee, setPostsState] = useRecoilState(postsState);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVpdModalOpen, setIsVpdModalOpen] = useState(false);

  
  const openPetModal = () => { setIsPetModalOpen(true)};
  const closePetModal = () => { setIsPetModalOpen(false)};
  const openProductModal = () => { setIsProductModalOpen(true)};
  const closeProductModal = () => { setIsProductModalOpen(false)};
  const openVpdModal = () => { setIsVpdModalOpen(true)};
  const closeVpdModal = () => { setIsVpdModalOpen(false)};

  async function postDelete() {
    const deleteResponse = await deletePost(post.postId);
    console.log(deleteResponse);
    setPostsState(!postsStatee);
  }
  useEffect(() => {
    console.log("Posts Component");
  }, []);


  return (
    <>
    <Center>
      <Box p={4} borderWidth={1} borderRadius="md" mb={4} width={{base:"300px",sm:"350px",lg:"400px"}} backgroundColor={'white'}>
        <Flex align="center" mb={2} height={'100%'}>
          <Avatar size="xs" name={post.user.userName} src={post.user.profileImageUri} />
          <Box>
            <Text ml={2} fontWeight="bold">{post.user.userName}</Text>
            <Text ml={2} textAlign={'left'} fontSize={13}> Madurai{post.Pet?.location}</Text>
          </Box>

          <Spacer />
          {post.label === "pet" && post.status && post.pet?.virtualPlayDateStatus && (
            <Box><Text _hover={{ cursor: "pointer" }} onClick={openVpdModal}>⚡</Text></Box>
          )}
          <Spacer />
          {post.label === "pet" && post.status && (
            <Box><Button size={'sm'} _hover={{ cursor: "pointer" }} onClick={openPetModal}>Adopt</Button></Box>
          )}
          <Spacer />
          {post.label === "product" && post.status && (
            <Box><Button size={'sm'} _hover={{ cursor: "pointer" }} onClick={openProductModal}> ₹{post.product?.price}</Button></Box>
          )}
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              colorScheme="transparent"
              aria-label="Options"
              icon={<Icon as={FaEllipsisV} />}
              size="sm"
              width={1}
            />
            <MenuList>
              <MenuItem onClick={postDelete}>Edit Post</MenuItem>
              <MenuItem onClick={postDelete}>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        </Flex>


        <Box mb={2} justifyContent="center" alignItems="center" display="flex" width="100%" height="100%">
          <Image
            src={`${staticFilesUrl}/posts/${post.postId}${post.imageUri}`}
            alt="Post"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>


        <Flex justify="space-between" align="center" mb={2}>
          <Flex align="center">
            <IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="Like"
              icon={<Icon as={FaHeart} />}
              mr={2}
              width={50}
              onClick={liked}
            />
            <IconButton
              variant="ghost"
              colorScheme="blue"
              aria-label="Comment"
              icon={<Icon as={FaComment} />}
              mr={2}
              width={50}
            />
            <IconButton
              variant="ghost"
              colorScheme="green"
              aria-label="Share"
              icon={<Icon as={FaShare} />}
              width={50}
            />
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="transperent"
            aria-label="Save"
            icon={<Icon as={FaSave} />}
            width={50}
          />
        </Flex>
        <HStack>
        <Text fontWeight="bold" textAlign={'left'}>Liked by  </Text>
        <Text  fontWeight="normal">_.ashwin_raj._</Text>
        <Text>and 10 others</Text>
        </HStack>
        

        <Box mb={2} textAlign={'left'}>
          <Text fontWeight="bold" as={'span'} >{post.user.userName}</Text>
          {post.caption}
        </Box>

        <Text color="gray.500" textAlign={'left'}>View all 5 comments</Text>
        <Flex align="left" mt={2} >
          <Avatar size="xs" name="_.ashwin_raj._" src="https://www.pngfind.com/pngs/m/488-4887957_facebook-teerasej-profile-ball-circle-circular-profile-picture.png" />
          <Box ml={2} fontSize="sm" textAlign={'left'}>
            <Text fontWeight="bold" as="span">{"comments[0].user"} </Text>
            <Text fontWeight={400}> This is a sample comment</Text>
          </Box>
        </Flex>
      </Box>
    </Center>

    {isPetModalOpen && <PetDetailsModal closeModal={closePetModal} post={post}/>}
    {isProductModalOpen && <ProductDetailsModal closeModal={closeProductModal} post={post} />}
    {isVpdModalOpen && <VpdDetailsModal closeModal={closeVpdModal} post={post} />}

    </>
  );
};

export default Post;
