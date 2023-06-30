import { React, useEffect} from 'react'
import {baseUrl, encryptionKey } from "../../constants/contants";
import {authStatus } from "../../recoilAtoms/Auth";
import axios from "axios";
import HomePage from "../user/HomePage";
import { AES } from 'crypto-js';
import CryptoJS from "crypto-js";
import LoginPage from "../auth/LoginPage";
import { useRecoilState} from "recoil";

async function checkIfUsernameExists(userName) {
  console.log("checkusername fn - " + userName);
  const response = await axios.get(`${baseUrl}/User/${userName}`);
  if (response.status === 200) {
    console.log("success");
    return true;
  }
  return false;
}
function getDecryptedUsernameFromStorage(encryptedUsernameFromStorage){
  const decryptedBytes = AES.decrypt(encryptedUsernameFromStorage, encryptionKey);
  const decryptedUsername = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedUsername;
}
function LandingPage() {
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  useEffect(() => {
    console.log("landingpage");
    // console.log(authStatuss);
    const encryptedUsernameFromStorage = localStorage.getItem("username");
    if(authStatuss.status==false && encryptedUsernameFromStorage!=null){
      const userName = getDecryptedUsernameFromStorage(encryptedUsernameFromStorage);
      const checkStatus = async () => {
        if (await checkIfUsernameExists(userName)) {
          setAuthStatus({ status: true, userName: userName });
        }
      };
    checkStatus();
    }
  }, [authStatuss]);
  return (
    <> {authStatuss.status ?<HomePage/>: <LoginPage/>} </>
  );
};

export default LandingPage;