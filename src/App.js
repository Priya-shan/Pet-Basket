import './App.css';
import {createBrowserRouter} from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage';

export const routes=createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  }
]);
// function App() {
//   return (
//     <ChakraProvider>
//       <div className="App">
        
//       </div>
//     </ChakraProvider>
//   );
// }

// export default App;
