import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { FaPlus, FaTrash, FaImage, FaUsers, FaClipboardList } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('addItems');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [itemIdToRemove, setItemIdToRemove] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [itemIdToUpdate, setItemIdToUpdate] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productLongDesc, setProductLongDesc] = useState('');
    const [productImageFile, setProductImageFile] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [userIdToDelete, setUserIdToDelete] = useState('');
    const [userOrders, setUserOrders] = useState([]);
    const [guestOrders, setGuestOrders] = useState([]);


    const handleItemIdChange = (e) => {
        setItemIdToRemove(e.target.value);
        setDeleteMessage(''); // Reset delete message when item ID changes
    };

    const handleItemIdToUpdateChange = (e) => {
        setItemIdToUpdate(e.target.value);
        setUpdateMessage(''); // Reset update message when item ID changes
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductDescChange = (e) => {
        setProductDesc(e.target.value);
    };

    const handleProductCategoryChange = (e) => {
        setProductCategory(e.target.value);
    };

    const handleProductLongDescChange = (e) => {
        setProductLongDesc(e.target.value);
    };

    const handleProductImageFileChange = (e) => {
        const file = e.target.files[0];
        setProductImageFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', productName);
        formData.append('price', productPrice);
        formData.append('description', productDesc);
        formData.append('category', productCategory);
        formData.append('longDescription', productLongDesc);
        formData.append('image', productImageFile);

        try {
            const response = await fetch('http://localhost/api/insert_product.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data); // Handle success response
                window.location.href = 'admin';
            } else {
                console.error('Failed to add item'); // Handle error response
            }
        } catch (error) {
            console.error('Error:', error); // Handle network errors
        }
    };

    const handleRemoveItem = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/api/remove_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemID: itemIdToRemove
                })
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data); // Handle success response
                setDeleteMessage(data); // Set delete message based on server response
            } else {
                console.error('Failed to remove item'); // Handle error response
            }
        } catch (error) {
            console.error('Error:', error); // Handle network errors
        }
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemId', itemIdToUpdate);
        formData.append('title', productName);
        formData.append('price', productPrice);
        formData.append('description', productDesc);
        formData.append('category', productCategory);
        formData.append('longDescription', productLongDesc);
        formData.append('image', productImageFile);

        try {
            const response = await fetch('http://localhost/api/update_product.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data); // Handle success response
                setUpdateMessage('Item updated successfully.');
            } else {
                console.error('Failed to update item'); // Handle error response
                setUpdateMessage('Failed to update item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error); // Handle network errors
            setUpdateMessage('Network error. Please try again.');
        }
    };

    const handleUserIdToDeleteChange = (e) => {
        setUserIdToDelete(e.target.value);
        setDeleteMessage(''); // Reset delete message when user ID changes
    };

    const handleDeleteUser = async () => {
        try {
            const response = await fetch('http://localhost/api/delete_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userIdToDelete
                }),
            });
    
            if (response.ok) {
                const data = await response.json(); // Parse JSON here
                setDeleteMessage(data.message); // Assuming data.message exists
            } else {
                console.error('Failed to delete user:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const fetchUserOrders = async () => {
        try {
            const response = await fetch('http://localhost/api/get_user_orders.php');
            if (response.ok) {
                const data = await response.json();
                setUserOrders(data);
            } else {
                console.error('Failed to fetch user orders');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const fetchGuestOrders = async () => {
        try {
            const response = await fetch('http://localhost/api/get_guest_orders.php');
            if (response.ok) {
                const data = await response.json();
                setGuestOrders(data);
                console.log(data)
            } else {
                console.error('Failed to fetch guest orders');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        fetchUserOrders();
        fetchGuestOrders();
    }, []);

    

    const renderContent = () => {
        switch (activeTab) {
            case 'addItems':
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Items</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-4"> 
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input 
            type="text"
            id='productName'
            value={productName}
            onChange={handleProductNameChange}
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
            placeholder="Item Name" 
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input 
            type="number"
            id='productPrice'
            value={productPrice}
            onChange={handleProductPriceChange}
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
            placeholder="Price" 
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            id='productDesc'
            value={productDesc}
            onChange={handleProductDescChange}
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
            placeholder="Description"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
            <select 
                id='productCategory'
                value={productCategory}
                onChange={handleProductCategoryChange}
                className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
            >
                <option value="">Select a category</option>
                <option value="Arm Chairs & Recliners">Arm Chairs & Recliners</option>
                <option value="Bookcases">Bookcases</option>
                <option value="Buffet & Sideboards">Buffet & Sideboards</option>
                <option value="Cabinets & Storage">Cabinets & Storage</option>
                <option value="Chairs">Chairs</option>
                <option value="Coffee Tables">Coffee Tables</option>
                <option value="Console Tables">Console Tables</option>
                <option value="Display Units">Display Units</option>
                <option value="Entertainment Centres & TV Stands">Entertainment Centres & TV Stands</option>
                <option value="Nest of Tables">Nest of Tables</option>
                <option value="Sofas">Sofas</option>
                <option value="Stools">Stools</option>
                <option value="Tables">Tables</option>
            </select>
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input 
            type="file"
            onChange={handleProductImageFileChange} // Call handleProductImageFileChange when a file is selected
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
          />
        </div>
        <div>
          <label className="block text-gray-700">Long Description</label>
          <textarea
            id='productLongDesc'
            value={productLongDesc}
            onChange={handleProductLongDescChange}
            className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
            placeholder="Long Description"
          ></textarea>
        </div>
        <button type='submit' className="bg-green-700 text-white p-3 rounded-lg">Add Item</button>
      </form>
    </div>
  );
  case 'updateItems':
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Update Items</h2>
            <form encType="multipart/form-data" onSubmit={handleUpdateItem} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Item ID</label>
                    <input
                        type="text"
                        value={itemIdToUpdate}
                        onChange={handleItemIdToUpdateChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                        placeholder="Item ID"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Item Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                        placeholder="Item Name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={productDesc}
                        onChange={handleProductDescChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                        placeholder="Description"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Category</label>
                    <select
                        value={productCategory}
                        onChange={handleProductCategoryChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                    >
                        <option value="">Select a category</option>
                        <option value="Arm Chairs & Recliners">Arm Chairs & Recliners</option>
                        <option value="Bookcases">Bookcases</option>
                        <option value="Buffet & Sideboards">Buffet & Sideboards</option>
                        <option value="Cabinets & Storage">Cabinets & Storage</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Coffee Tables">Coffee Tables</option>
                        <option value="Console Tables">Console Tables</option>
                        <option value="Display Units">Display Units</option>
                        <option value="Entertainment Centres & TV Stands">Entertainment Centres & TV Stands</option>
                        <option value="Nest of Tables">Nest of Tables</option>
                        <option value="Sofas">Sofas</option>
                        <option value="Stools">Stools</option>
                        <option value="Tables">Tables</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Upload New Image</label>
                    <input
                        type="file"
                        onChange={handleProductImageFileChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Long Description</label>
                    <textarea
                        value={productLongDesc}
                        onChange={handleProductLongDescChange}
                        className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg"
                        placeholder="Long Description"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-700 text-white p-3 rounded-lg">
                    Update Item
                </button>
                {updateMessage && (
                    <p className="mt-4 text-sm text-gray-700">{updateMessage}</p>
                )}
            </form>
        </div>
    );

  case 'removeItems':
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Remove Items</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700">Item ID</label>
                    <input 
                                    type="text" 
                                    value={itemIdToRemove} 
                                    onChange={handleItemIdChange} 
                                    className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" 
                                    placeholder="Item ID" 
                                />
                </div>
                <button onClick={handleRemoveItem} className="bg-red-700 text-white p-3 rounded-lg">Remove Item</button>
                {deleteMessage && (
                                <p className="mt-4 text-sm text-gray-700">
                                    {deleteMessage}
                                </p>
                            )}
            </div>
        </div>
    );
            case 'updateImages':
                return (
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">Update Product Images</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Item ID</label>
                                <input type="text" className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="Item ID" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Upload New Image</label>
                                <input type="file" className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" />
                            </div>
                            <button className="bg-blue-700 text-white p-3 rounded-lg">Update Image</button>
                        </div>
                    </div>
                );
                case 'deleteUsers':
                    return (
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Delete Users</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">User ID</label>
                                    <input type="text"
                                        value={userIdToDelete}
                                        onChange={handleUserIdToDeleteChange}
                                    className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg" placeholder="User ID" />
                                </div>
                                <button onClick={handleDeleteUser} className="bg-red-700 text-white p-3 rounded-lg">Delete User</button>
                                {deleteMessage && (
                                    <p className="mt-4 text-sm text-gray-700">
                                        {deleteMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                    case 'manageOrders':
                        return (
                            <div className="p-1">
                                <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
                                <div className="overflow-x-auto">
                                    {/* User Orders Table */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold mb-2">User Orders</h3>
                                        <table className="w-full bg-white border border-gray-300 rounded-lg mb-6">
                                            <thead>
                                                <tr>
                                                    <th className="border-b border-gray-300 p-3">Order ID</th>
                                                    <th className="border-b border-gray-300 p-3">User ID</th>
                                                    <th className="border-b border-gray-300 p-3">First Name</th>
                                                    <th className="border-b border-gray-300 p-3">Last Name</th>
                                                    <th className="border-b border-gray-300 p-3">Street Address</th>
                                                    <th className="border-b border-gray-300 p-3">City</th>
                                                    <th className="border-b border-gray-300 p-3">Phone Number</th>
                                                    <th className="border-b border-gray-300 p-3">Email Address</th>
                                                    <th className="border-b border-gray-300 p-3">Note</th>
                                                    <th className="border-b border-gray-300 p-3">Purchase Date</th>
                                                    <th className="border-b border-gray-300 p-3">Products</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userOrders.map(order => (
                                                    <tr key={order.order_id}>
                                                        <td className="border-b border-gray-300 p-3">{order.order_id}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.guest_id}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.first_name}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.last_name}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.street_address}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.city}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.phone_number}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.email_address}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.note}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.purchase_date}</td>
                                                        <td className="border-b border-gray-300 p-3">
                                                            <ul className={`product-list max-w-lg flex gap-3 justify-start items-center ${order.products.length > 2 ? 'overflow-x-scroll' : ''}`}>
                                                                {order.products.map(product => (
                                                                    <li key={product.product_id} className="product-item">
                                                                      {product.title} <br />
                                                                        <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} /><br />
                                                                        Price: ${product.price} <br />
                                                                        Quantity: {product.quantity}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                    
                                    {/* Guest Orders Table */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Guest Orders</h3>
                                        <table className="w-full bg-white border border-gray-300 rounded-lg mb-6">
                                            <thead>
                                                <tr>
                                                    <th className="border-b border-gray-300 p-3">Order ID</th>
                                                    <th className="border-b border-gray-300 p-3">First Name</th>
                                                    <th className="border-b border-gray-300 p-3">Last Name</th>
                                                    <th className="border-b border-gray-300 p-3">Street Address</th>
                                                    <th className="border-b border-gray-300 p-3">City</th>
                                                    <th className="border-b border-gray-300 p-3">Phone Number</th>
                                                    <th className="border-b border-gray-300 p-3">Email Address</th>
                                                    <th className="border-b border-gray-300 p-3">Note</th>
                                                    <th className="border-b border-gray-300 p-3">Purchase Date</th>
                                                    <th className="border-b border-gray-300 p-3">Products</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {guestOrders.map(order => (
                                                    <tr key={order.order_id}>
                                                        <td className="border-b border-gray-300 p-3">{order.order_id}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.first_name}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.last_name}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.street_address}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.city}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.phone_number}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.email_address}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.note}</td>
                                                        <td className="border-b border-gray-300 p-3">{order.purchase_date}</td>
                                                        <td className="border-b border-gray-300 p-3">
                                                        <ul className={`product-list max-w-lg flex gap-3 justify-start items-center ${order.products.length > 2 ? 'overflow-x-scroll' : ''}`}>
                                                                {order.products.map(product => (
                                                                    <li key={product.product_id} className="product-item">
                                                                      {product.title} <br />
                                                                        <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} /><br />
                                                                        Price: ${product.price} <br />
                                                                        Quantity: {product.quantity}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col md:flex-row flex-grow bg-gray-100">
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
                            onClick={() => setActiveTab('addItems')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'addItems' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaPlus className="mr-3" /> Add Items
                        </button>
                        <button
                            onClick={() => setActiveTab('removeItems')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'removeItems' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaTrash className="mr-3" /> Remove Items
                        </button>
                        <button
                            onClick={() => setActiveTab('updateItems')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'updateItems' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaImage className="mr-3" /> Update Items
                        </button>
                        <button
                            onClick={() => setActiveTab('deleteUsers')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'deleteUsers' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaUsers className="mr-3" /> Delete Users
                        </button>
                        <button
                            onClick={() => setActiveTab('manageOrders')}
                            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'manageOrders' ? 'bg-amber-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
                            <FaClipboardList className="mr-3" /> Manage Orders
                        </button>
                    </nav>
                </div>

                {/* Right Container - Main Content */}
                <div className="flex-grow p-6">
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
