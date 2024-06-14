import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoImage from '../Assets/logo.jpg';
import './Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loggedIn = sessionStorage.getItem("loggedIn");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("userData");
        // Redirect to login page or homepage after logout
        window.location.href = "/login";
    };

    return (
        <div className="Container">
            <div className='Header'>
                {/* Menu Icon */}
                <button onClick={toggleMenu} className="lg:hidden absolute top-4 right-4 z-10">
                    {!isOpen ? (
                        <MenuIcon sx={{ fontSize: 40 }} />
                    ) : (
                        <CloseIcon sx={{ fontSize: 40 }} />
                    )}
                </button>

                {/* Floating Div */}
                <div className={`fixed top-0 left-0 w-full h-80vh bg-white text-black text-center py-6 z-40 ${isOpen ? 'block' : 'hidden'}`} style={{ border: '1px solid #ccc', alignItems: 'center' }}>
                    <button onClick={toggleMenu} className="absolute top-4 right-4 z-10">
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </button>
                    <div className="flex flex-col justify-center h-full space-y-6 pt-5">
                        <Button style={{ color: 'black', fontSize: '15px' }}>Contact Us</Button>
                        <Button style={{ color: 'black', fontSize: '15px' }}>Categories</Button>
                        <Button style={{ color: 'green', fontSize: '15px' }}><Link to="/cart"><ShoppingBagIcon style={{ fontSize: '50px' }} /></Link></Button>

                        <div className="flex items-center justify-center space-x-4">
                            {loggedIn ? (
                                <>
                                    <div className="relative inline-block">
                                        <Link to="/account" className="flex items-center">
                                            <span style={{ color: 'white', backgroundColor: '#214A25', padding: '8px 16px', borderRadius: '9999px' }}>Account</span>
                                            <ArrowDropDownIcon style={{ color: 'white' }} />
                                        </Link>
                                        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg hidden">
                                            {/* Dropdown content here */}
                                            <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button style={{ color: 'black' }} variant="outlined"><Link to="/login">Login</Link></Button>
                                    <Button style={{ color: 'white', backgroundColor: '#214A25' }} variant="contained"><Link to="/signup">SignUp</Link></Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Header Menu */}
                <div className="lg:hidden items-center justify-between px-8 pt-4 pb-1 text-2xl font-bold text-black ">     <Link to="/"><img className='w-24 ' src={LogoImage} alt="" /></Link></div>

                <div className="header hidden lg:flex items-center justify-between lg:px-40">
                    {/* Left side */}
                    <div className='flex'>
                        <Link to="/"><img className='w-28 h-28' src={LogoImage} alt="" /></Link>
                    </div>

                    {/* Menu Items */}
                    <div className="flex items-center space-x-6">
                        <Button style={{ color: 'black', fontSize: '1vw' }}><Link to={'/categories'}>Categories</Link></Button>
                        <Button style={{ color: 'green', fontSize: '1vw' }}><Link to="/cart"><ShoppingBagIcon style={{ fontSize: '40px' }} /></Link></Button>
                        <div className="flex items-center space-x-4">
                            {loggedIn ? (
                                <>
                                    <div className="relative inline-block">
                                        <Link to="/account" className="flex items-center">
                                            <span style={{ color: 'white', backgroundColor: '#214A25', padding: '12px 19px', borderRadius: '9999px' }}>Account</span>
                                            <ArrowDropDownIcon style={{ color: 'white' }} />
                                        </Link>
                                        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg hidden">
                                            {/* Dropdown content here */}
                                            <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button style={{ color: 'black' }} variant="outlined"><Link to="/login">Login</Link></Button>
                                    <Button style={{ color: 'white', backgroundColor: '#214A25' }} variant="contained"><Link to="/signup">SignUp</Link></Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
