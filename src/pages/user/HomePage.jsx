import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState} from "recoil";
import { authStatus } from "../../recoilAtoms/Auth";
function HomePage() {
  const [authStatuss, setAuthStatus] = useRecoilState(authStatus);
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("username");
    console.log("logging out");
    setAuthStatus({ status: false, userName: '' });
  }
  useEffect(()=>{
    console.log("homepage");
  },[]);
  return (
    <div>HomePage
      <br></br>
      <button onClick={logout}>Logout</button>
    </div>
    
  )
};

export default HomePage