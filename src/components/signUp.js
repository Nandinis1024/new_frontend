import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.status === 201) {
        toast.success('Sign up successful');
        localStorage.setItem('email', email);
        if(role === 'admin'){
          navigate('/createProduct');
        }
        else{
          navigate('/displayUserProducts');
        }
      } else {
        if(response.status === 400) {
          toast.error('Sign up failed, User already exists Please try again');
        }else{
          toast.error('Sign up failed, Please try again');
        }

        console.error('Sign up failed:');
      }
    } catch (error) {
      toast.error('Sign up failed due to network error');
      console.error('Sign up failed:', error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200" style={
      {
          backgroundImage: `url('./bg-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
      }
  }>
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <div className="flex items-center">
              <button
                type="button"
                className={`mr-2 py-1 px-3 rounded-md focus:outline-none ${role === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setRole('admin')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`py-1 px-3 rounded-md focus:outline-none ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setRole('user')}
              >
                User
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-700">
          Already registered?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>

      <button type="submit" className="flex gap-3 mt-6 bg-white text-gray-700 py-2 px-10 text-center rounded-md hover:bg-white focus:outline-none focus:bg-blue-600"
        onClick={() => {
          navigate('/')
          }
        }
      > 
        <span className="text-gray-700"><FontAwesomeIcon icon={faArrowLeft} className="h-6" /></span>
        Go Back
      </button>

    </div>
  );
}

export default Signup;



