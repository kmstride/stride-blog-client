import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setToken } from '../../feature/rootSlice';
import { useNavigate } from 'react-router-dom';

function LogOutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("authToken");
        dispatch(setToken(null));
        navigate("/login")
    }
  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogOutBtn
