import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || (allowedRoles && !allowedRoles.includes(storedUser.role))) {
      navigate('/signin/customer');
    } else {
      setUser(storedUser);
    }
  }, [allowedRoles, navigate]);

  return user ? children : null;
};


export default ProtectedRoute;
