import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/');
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    }
    logout();
  }, []);

}

export default Logout;