import './App.css';
import { createBrowserRouter } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import SignupPage from './pages/auth/SignupPage';
import { authStatus } from "./recoilAtoms/Auth";
import HomePage from './pages/user/HomePage';
import LandingPage from './pages/auth/LandingPage'
import Activities from './pages/user/Activities';
import Profile from "./pages/user/Profile";
import SavedItems from './pages/user/SavedItems';

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/activities",
    element: <Activities/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/savedItems",
    element: <SavedItems/>
  },
  
]);
