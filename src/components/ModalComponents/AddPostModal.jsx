import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
        Text, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, Switch, Flex, Center,} from '@chakra-ui/react';
import samplePostImage from '../../images/samplePostImage.png';
import ProfileImageSample from '../../images/ProfileImage1.png';
import { useRecoilState,useRecoilValue } from "recoil";
import { authStatus,postsState } from "../../recoilAtoms/Auth";
import CustomInput from '../ChakraComponents/CustomInput'
import { toast } from 'react-toastify';
import { addPost} from '../../api/posts';
import { addPet } from '../../api/pets';
import { addProduct } from '../../api/products';
import { addVpd } from '../../api/virtualPlayDates';
import { addVpdTimeSlot } from '../../api/vpdTimeSlots';

function AddPostModal({ closeModal }) {
  const authUser=useRecoilValue(authStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isVpdAvailable, setIsVpdAvailable] = useState(false);
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSelectedImage, setShowSelectedImage] = useState(samplePostImage);
  const fileInputRef = useRef(null);
  const [selectedRadio, setSelectedRadio] = useState('pet');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    caption: '',
    petName: '',
    location: '',
    petDescription: '',
    productName: '',
    productAmount: '',
    productDescription: '',
    vpdAmount: '',
    vpdDuration: '',
    vpdTimeSlot: '',
    vpdDescription: '',
  });
  const [postsStatee, setPostsState] = useRecoilState(postsState);
  
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };
 
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setShowSelectedImage(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const handleRadioChange = (value) => {
    console.log("enetered handle radio");
    console.log(selectedRadio);
    setSelectedRadio(value);
    console.log(selectedRadio);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handlePost(event){
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // puts an entry in post table
      const postModal={
        username: authUser.userName,
        imageUri: selectedImage,
        caption: formData.caption,
        label: selectedRadio,
        status: isAvailable,
        createdAt :  new Date()
      }
      const postResponse = await addPost(postModal);
      console.log(postResponse.data);
      const response=postResponse.data
      setPostsState(!postsStatee);
      if(isAvailable || isVpdAvailable){
        if(selectedRadio==="pet"){
          //puts an entry in pet table
          const petModal = {
            postId: postResponse.data.postId,
            petName: formData.petName,
            description: formData.petDescription,
            location: formData.location,
            virtualPlayDateStatus: isVpdAvailable,
          }
          const petResponse = await addPet(petModal);
          console.log(petResponse.data);
          if(isVpdAvailable){
            // puts an entry in VPD table
            const vpdModal={
              petId: petResponse.data.petId,
              description: formData.vpdDescription,
              price: formData.vpdAmount,
              duration: formData.vpdDuration,
            }
            const vpdResponse = await addVpd(vpdModal);
            console.log(vpdResponse.data);
            // puts an entry in Time Slot table
            const timeSlots=formData.vpdTimeSlot.split(",");
            for (var slot of timeSlots) {
              const slotModal={
                vpdId: vpdResponse.data.vpdId,
                slotTime: slot,
              }
              const timeSlotResponse = await addVpdTimeSlot(slotModal);
              console.log(timeSlotResponse.data);
            }
          }
        }
        else{
          // puts an entry in Products table
          const productModal={
            postId: postResponse.data.postId,
            productName: formData.productName,
            description: formData.productDescription,
            price: formData.productAmount,
          };
          const productResponse = await addProduct(productModal);
          console.log(productResponse.data);
        }
        toast("✔ Post Uploaded Succesfully");
      }
      else{
        toast("✔ Post Uploaded Succesfully");
      }
    }
    catch (error) {
      toast("🤐 An unkown error occured... Try again !");
      console.log("An error occurred while making the post request:", error);
    }

    handleClose();
    setIsSubmitting(false);
  };

  useEffect(() => {
    handleOpen();
    console.log("Add New Post Modal");
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="6xl" maxHeight="200px">
      <form onSubmit={handlePost} encType='multipart/form-data'>
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageSelect}
      />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display="flex" justifyContent="flex-end">
              <Button mr={4} onClick={() => fileInputRef.current.click()}>Select File</Button>
              <Button mr={8} disabled={isSubmitting} type='submit'>Post</Button>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="scroll" maxHeight="65vh">
            <Grid templateColumns={{base:"repeat(1,1fr)",md:"repeat(2, 1fr)"}} gap={4}>
              <GridItem>
                <Center>
                  <Box mb={3}>
                    <img src={showSelectedImage} alt="Image" style={{ height: '300px', width: 'auto' }} />
                  </Box>
                </Center>
                <Center>
                  <Box display={"flex"} flexDirection={{base:"column",md:"row"}}>
                    <RadioGroup defaultValue="pet" onChange={handleRadioChange}>
                      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                        <Radio value="pet" colorScheme='brand' border={'1px solid black'}>Pet </Radio>
                        <Radio value="product" colorScheme='brand' border={'1px solid black'}>Product</Radio>
                      </Grid>
                    </RadioGroup>
                    <Box ml={15}>
                      <Switch
                        colorScheme="brand"
                        isChecked={isAvailable}
                        onChange={() => {
                          setIsAvailable(!isAvailable);
                          if (isAvailable) {
                            setIsVpdAvailable(false)
                          }
                        }
                        }
                      >
                        Available
                      </Switch>
                    </Box>
                  </Box>
                </Center>


              </GridItem>
              <GridItem display={{ base: 'block', md: 'grid' }}>
                <Box>
                  <Box display="flex" mb={4}>
                    <Box w={8} h={8} bg="gray.200" borderRadius="full" mr={2}>
                      <img src={ProfileImageSample} alt="Profile" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold">p_r_i_y_a_shan</Text>
                    </Box>
                  </Box>
                  <Box>
                    <FormControl mb={4}>
                      <FormLabel>Caption</FormLabel>
                      <CustomInput name="caption" value={formData.caption} onChange={handleInputChange}/>
                    </FormControl>
                  </Box>
                </Box>
                {selectedRadio === 'pet' && (
                  <>
                    {(isAvailable || isVpdAvailable) && (
                      <>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                          <FormControl>
                            <FormLabel>Pet Name</FormLabel>
                            <CustomInput name="petName" value={formData.petName} onChange={handleInputChange}/>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Location</FormLabel>
                            <CustomInput name="location" value={formData.location} onChange={handleInputChange}/>
                          </FormControl>
                        </Grid>
                        <FormControl mb={4}>
                          <FormLabel>Description</FormLabel>
                          <Textarea name="petDescription" value={formData.petDescription} onChange={handleInputChange} border="2px" borderColor="brand.900" boxShadow='none' _focus={{ boxShadow: 'none', borderColor: 'brand.900' }} _hover={{ borderColor: 'brand.900' }} />
                        </FormControl>
                      </>
                    )}
                    <Box mb={4}>
                      <Switch
                        colorScheme="brand"
                        onChange={() => setIsVpdAvailable(!isVpdAvailable)}
                      >Virtual Play Date</Switch>
                    </Box>
                  </>
                )}

                {selectedRadio === 'product' && isAvailable && (
                  <>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                      <FormControl>
                        <FormLabel>Product Name</FormLabel>
                        <CustomInput name="productName" value={formData.productName} onChange={handleInputChange} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <CustomInput name="productAmount" value={formData.productAmount} onChange={handleInputChange}/>
                      </FormControl>
                    </Grid>
                    <FormControl mb={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea name="productDescription" value={formData.productDescription} onChange={handleInputChange} border="2px" borderColor="brand.900" boxShadow='none' _focus={{ boxShadow: 'none', borderColor: 'brand.900' }} _hover={{ borderColor: 'brand.900' }} />
                    </FormControl>
                  </>
                )}

                {isVpdAvailable && selectedRadio === 'pet' &&(
                  <>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                      <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <CustomInput name="vpdAmount" value={formData.vpdAmount} onChange={handleInputChange}/>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Duration</FormLabel>
                        <CustomInput name="vpdDuration" value={formData.vpdDuration} onChange={handleInputChange}/>
                      </FormControl>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                      <FormControl>
                        <FormLabel>Time Slot</FormLabel>
                        <CustomInput name="vpdTimeSlot" value={formData.vpdTimeSlot} onChange={handleInputChange}/>
                      </FormControl>
                    </Grid>
                    <FormControl mb={4}>
                      <FormLabel>VPD Description</FormLabel>
                      <Textarea name="vpdDescription" value={formData.vpdDescription} onChange={handleInputChange} border="2px" borderColor="brand.900" boxShadow='none' _focus={{ boxShadow: 'none', borderColor: 'brand.900' }} _hover={{ borderColor: 'brand.900' }} />
                    </FormControl>
                  </>
                )}
              </GridItem>
            </Grid>
          </ModalBody>

        </ModalContent>
        </form>
      </Modal>
      
    </>
  );
}

export default AddPostModal;
