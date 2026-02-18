import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

const handleLogout =()=>{
    logout();
    navigate("./login")
}
  return (
    <Button onClick={handleLogout} variant="danger">log out</Button>
  )
}

export default LogoutButton