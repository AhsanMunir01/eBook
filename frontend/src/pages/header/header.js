import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import {useState} from 'react';
import{isAdminLoggedIn, isCustomerLoggedIn} from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/common';

export default function Header() {
   const [isAdmin, setIsAdmin] = useState(false);
   const [isCustomer, setIsCustomer] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
    const fetchUserRole = async () => {
        try{
            const isAdmin = await isAdminLoggedIn();
            const isCustomer = await isCustomerLoggedIn();
            setIsAdmin(isAdmin);
            setIsCustomer(isCustomer);
        }catch(error){
            console.error(`Error fetching user role: ${error}`);
        }
   };
        fetchUserRole();
    }, [location]);

    const handleLogout = () => {
        navigate('/login');
        removeToken()
    }
    return (
        <>
            {!isAdmin && !isCustomer && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                            size = "large"
                            edge = "start"
                            color = "inherit"
                            aria-label = "menu"
                            sx = {{mr: 2}}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                               Book Store
                            </Typography>
                            <Button component = {Link} to= "/login" color = "inherit">
                                Login
                            </Button>
                            <Button component = {Link} to= "/register" color = "inherit">
                                Register
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
            
            {isAdmin && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                            size = "large"
                            edge = "start"
                            color = "inherit"
                            aria-label = "menu"
                            sx = {{mr: 2}}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                               Admin
                            </Typography>
                            <Button component = {Link} to= "/admin/dashboard" color = "inherit">Dashboard</Button>
                            <Button component = {Link} to= "/admin/book/post" color = "inherit">Post Book</Button>
                            <Button component = {Link} to= "/admin/order" color = "inherit">View Order</Button>
                            <Button onClick = {handleLogout} color = "inherit">Logout</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
            {isCustomer && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                            size = "large"
                            edge = "start"
                            color = "inherit"
                            aria-label = "menu"
                            sx = {{mr: 2}}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                               Customer 
                            </Typography>
                            <Button component = {Link} to= "/customer/dashboard" color = "inherit">
                                Dashboard
                            </Button>
                            <Button component = {Link} to= "/customer/cart" color = "inherit">
                                Cart
                            </Button>
                            <Button component = {Link} to= "/customer/my-orders" color = "inherit">
                                My Orders
                            </Button>
                            <Button onClick = {handleLogout} color = "inherit">
                                Logout
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
        </>
    )    
}
