import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreateProduct from './components/CreateProduct';
import CreateFeatures from './components/CreateFeatures';
import DisplayProducts from './components/DisplayProducts';
import DisplayUserProducts from './components/DisplayUserProducts';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Unauthorized from './components/Unauthorized';
import LandingPage from './components/LandingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/Logout';
import AdminNavBar from './components/AdminNavBar';


function App() {

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const getUserRole = async () => {
      const response = await fetch("http://localhost:4000/v1/auth/getRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("email") || "" }),
      });
      const data = await response.json();
      if(response.status === 200){
        setUserRole(data);
      }
      else if(response.status === 400){
        setUserRole('');
      }
      console.log(data);
    }
    getUserRole();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <AdminNavBar></AdminNavBar> */}

        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>

            {userRole === "admin"?(
            <Route path="/createProduct" element={<CreateProduct/>}/>
            ):(
              <Route path="/createProduct" element={<Unauthorized/>}/>
            )}

            {userRole === "admin"?(
            <Route path="/createFeatures" element={<CreateFeatures/>}/>
            ):(
            <Route path="/createFeatures" element={<Unauthorized/>}/>
            )}

            {userRole === "admin"?(
            <Route path="/displayProducts" element={<DisplayProducts/>}/>
            ):(
              <Route path="/displayProducts" element={<Unauthorized/>}/>
            )}

            <Route path="/displayUserProducts" element={<DisplayUserProducts/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/cancel" element={<Cancel/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>

        <ToastContainer 
          className="Toastify__toast-container--top-center"
          toastClassName="toastify-toast" 
          autoClose={1000}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
