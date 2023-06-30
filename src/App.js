import './App.css';
import {createBrowserRouter} from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import SignupPage from './pages/auth/SignupPage';
import {authStatus } from "./recoilAtoms/Auth";
import HomePage from './pages/user/HomePage';
import LandingPage from './pages/auth/LandingPage'

function CheckIsAuth(){
  var isAuthenticated = useRecoilValue(authStatus);
  return isAuthenticated;

}
export const routes=createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>
  },
  {
    path:"/signup",
    element:<SignupPage/>
  },
  {
    path:"/home",
    element:<HomePage/>
  }
]);
