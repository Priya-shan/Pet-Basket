import { Tabs, TabList, Tab, Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useColorMode } from "@chakra-ui/react";
import {colors} from "../../constants/contants"
import EnquiriesReceived from "../../components/ActivityComponents/EnquiriesReceived"
import EnquiriesSent from "../../components/ActivityComponents/EnquiriesSent"
import OrdersReceived from "../../components/ActivityComponents/OrdersRecieved"
import OrdersPlaced from "../../components/ActivityComponents/OrdersSent"
import VirtualPlayDates from "../../components/ActivityComponents/VpdRequests"
import SideBar from "../../components/SidebarComponents/SideBar";
import { toast } from 'react-toastify';
import axios from "axios";
import { baseUrl } from "../../constants/contants";
import { authStatus } from "../../recoilAtoms/Auth";
import { useRecoilState } from "recoil";
import {fetchUserById} from "../../api/users";
import BackgroundImage from "../../images/bg.png";

function Activities() {
  const tabs = [
    { label: "Enquiries Received", component: EnquiriesReceived },
    { label: "Enquiries Sent", component: EnquiriesSent },
    { label: "Orders Received", component: OrdersReceived },
    { label: "Orders Placed", component: OrdersPlaced },
    { label: "Virtual Play Dates", component: VirtualPlayDates },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const SelectedComponent = tabs[selectedTab].component;
  const [data, setData] = useState([]);
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);


  async function fetchData() {
    try {
    
      console.log("hello"+authStatuss.userName);
      const res= await fetchUserById(authStatuss.userName);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      toast("🤐 An unknown error occurred... Try again!");
      console.log("An error occurred while making the request:", error);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <>
    <Box position="sticky" left={0} bottom={0} width="100%" display={{ base: "block", md: "none" }} zIndex={2}>
    <SideBar />
</Box>
<Flex backgroundImage={BackgroundImage} style={{ backgroundAttachment: 'fixed' }} height={"100vh"} overflowY={'hidden'}>
<Box position="sticky" left={0} top={0} height="100vh" width="300px" display={{ base: "none", md: "block" }}>
                    <SideBar />
                </Box>
      <Box width={"100%"} >
        <Tabs mt={5}
          variant="enclosed"
          colorScheme="brand"
          size="md"
          onChange={(index) => setSelectedTab(index)}
        >
          <TabList display="flex" justifyContent="space-around" textAlign={'center'}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                _selected={{ color: "black", bg: "brand.500" }}
                _hover={{ bg: "brand.200" }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
        <Box mt={4}>
          <SelectedComponent data={data} />
        </Box>
      </Box>
    </Flex>
    </>
  );
}
export default Activities;
