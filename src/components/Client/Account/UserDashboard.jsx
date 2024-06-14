import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import MenuIcon from '@mui/icons-material/Menu';
import { FaUser, FaClipboardList, FaMapMarkedAlt, FaSignOutAlt, FaPen } from 'react-icons/fa';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('personalInfo');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: ''
    });
    const [userOrders, setUserOrders] = useState([]);

    // Function to handle input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleLogout = () => {
        // Clear the session storage
        sessionStorage.clear();
        // Redirect to the login page or another appropriate page
        window.location.href = '/login'; // Replace '/login' with the appropriate URL
    };

    const saveChanges = () => {
        const userSessionData = JSON.parse(sessionStorage.getItem(`userData`));
        const userId = userSessionData.Id;
        console.log("User ID from session:", userId);
        console.log("User session data:", userSessionData);
        console.log("User data to be sent:", userData);
    
        fetch('http://localhost/api/updateUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userData: userData // Pass user data as an object
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from server:", data);
            // Handle successful response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error
        });
    };

    // Function to fetch user orders from the server
    const fetchUserOrders = () => {
        const userSessionData = JSON.parse(sessionStorage.getItem(`userData`));
        const userId = userSessionData.Id;
    
        axios.get(`http://localhost/api/fetchUserOrders.php?userId=${userId}`)
            .then(response => {
                setUserOrders(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching user orders:', error);
            });
    };
    useEffect(() => {
        // Fetch user orders when component mounts
        fetchUserOrders();
    }, []);


    const renderOrderRows = () => {
        if (!Array.isArray(userOrders)) {
            return null;
        }
    
        return userOrders.map(order => (
            <tr key={order.id}>
                <td className="border-b border-gray-300 p-3">{order.id}</td>
                <td className="border-b border-gray-300 p-3">{order.purchase_date}</td>
                <td className="border-b border-gray-300 p-3">{order.total_price}</td>
                <td className="border-b border-gray-300 p-3">
                    {order.products.map(product => (
                        <div key={product.id} className="flex items-center space-x-4">
                            <img src={product.image} alt={product.title} className="w-20 h-20" />
                            <div>
                                <p>{product.title}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                </td>
            </tr>
        ));
    };
    
    
    const renderContent = () => {
        switch (activeTab) {
            case 'personalInfo':
                return (
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <img src="https://via.placeholder.com/100" alt="User" className="w-24 h-24 rounded-full mr-4" />
                            <button className="bg-gray-200 p-2 rounded-full">
                                <FaPen />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="First Name" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Last Name" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" name="email" value={userData.email} onChange={handleInputChange} className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Email" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Gender</label>
                                <select name="gender" value={userData.gender} onChange={handleInputChange} className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Phone Number" />
                            </div>
                            <button className="bg-green-700 text-white p-3 rounded-lg" onClick={saveChanges}>Save Changes</button>
                        </div>
                    </div>
                );
                case 'myOrders':
            return (
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">My Orders</h2>
                    <table className="w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-300 p-3">Order ID</th>
                                <th className="border-b border-gray-300 p-3">Date</th>
                                <th className="border-b border-gray-300 p-3">Total</th>
                                <th className="border-b border-gray-300 p-3">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderOrderRows()}
                        </tbody>
                    </table>
                </div>
            );
            // case 'addresses':
            //     return (
            //         <div className="p-6">
            //             <h2 className="text-xl font-bold mb-4">Addresses</h2>
            //             <div className="space-y-4">
            //                 <div>
            //                     <label className="block text-gray-700">Street Address</label>
            //                     <input type="text" className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Street Address" />
            //                 </div>
            //                 <div>
            //                     <label className="block text-gray-700">City</label>
            //                     <select className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg">
            //                         <option value="">Select City</option>
            //                         <option value="ramallah">Ramallah</option>
            //                         <option value="nablus">Nablus</option>
            //                         <option value="hebron">Hebron</option>
            //                         <option value="jericho">Jericho</option>
            //                         <option value="bethlehem">Bethlehem</option>
            //                     </select>
            //                 </div>
            //                 <div>
            //                     <label className="block text-gray-700">Phone Number</label>
            //                     <input type="text" className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Phone Number" />
            //                 </div>
            //                 <button className="bg-green-700 text-white p-3 rounded-lg">Save Address</button>
            //             </div>
            //         </div>
            //     );
            case 'logout':
                return (
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">Logout</h2>
                        <p>Are you sure you want to logout?</p>
                        <button
    onClick={handleLogout}
    className={`w-36 flex items-center p-3 rounded-lg bg-red-500 ${activeTab === 'logout' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
    <FaSignOutAlt className="mr-3" /> Logout
</button>

                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="lg:py-20 lg:px-20 flex flex-col md:flex-row flex-grow bg-gray-100">
                {/* Toggle Button for Mobile */}
                <button
                    className="md:hidden p-4 bg-gray-800 text-white"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <MenuIcon />
                </button>

                {/* Left Container - Navigation */}
                <div className={`w-full md:w-1/4 lg:w-1/4 bg-white p-6 border-r border-gray-300 ${isNavOpen ? 'block' : 'hidden'} md:block`}>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setActiveTab('personalInfo')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'personalInfo' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaUser className="mr-3" /> Personal Information
                        </button>
                        <button
                            onClick={() => setActiveTab('myOrders')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'myOrders' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaClipboardList className="mr-3" /> My Orders
                        </button>
                        {/* <button
                            onClick={() => setActiveTab('addresses')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'addresses' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaMapMarkedAlt className="mr-3" /> Addresses
                        </button> */}
                        <button
                            onClick={() => setActiveTab('logout')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'logout' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaSignOutAlt className="mr-3" /> Logout
                        </button>
                    </nav>
                </div>

                {/* Right Container - Content */}
                <div className="flex-grow p-6">
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
