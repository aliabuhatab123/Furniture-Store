import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CheckoutPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        phoneNumber: '',
        emailAddress: '',
        note: ''
    });
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setProducts(cartItems);

        const checkSession = () => {
            const loggedIn = sessionStorage.getItem('loggedIn');
            if (loggedIn) {
                const userData = JSON.parse(sessionStorage.getItem('userData'));
                setUserId(userData.Id);
                console.log('User ID set to:', userData.Id);
            } else {
                console.log('User is not logged in.');
            }
        };

        checkSession();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            userId: userId,
            orderDetails: formData,
            products: products,
            purchaseDate: new Date().toISOString()
        };

        const endpoint = userId ? 'record_orders.php' : 'record_guest_orders.php';

        try {
            const response = await fetch(`http://localhost/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                localStorage.removeItem('cart');
                navigate('/order-confirmation');
            } else {
                console.error('Failed to submit order:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const calculateSubtotal = () => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const taxRate = 0.07;
    const couponDiscount = 15.00;
    const shippingTotal = 10.00;

    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingTotal - couponDiscount;

    const palestinianCities = ["Jerusalem", "Nablus", "Hebron", "Ramallah", "Bethlehem", "Jenin", "Tulkarm", "Qalqilya", "Salfit", "Tubas"];

    return (
        <div className="pageContainer">
            <Header />
            <div className="bg-gray-200 py-20 px-8 text-center rounded-t-lg w-full mb-6">
                <div className="text-4xl font-semibold">Complete Your Order and Delivery Details</div>
                <div className="text-sm text-gray-600 mt-6">Home / Checkout</div>
            </div>
            <div className="min-h-screen bg-gray-100 p-20 flex flex-col items-center px-4 md:px-8 lg:px-56">
                <div className="flex flex-col md:flex-row w-full lg:mb-10">
                    <div className="w-full md:w-2/3 lg:w-2/3 bg-white rounded-lg p-6 mb-10 md:mb-0 md:mr-10">
                        <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    placeholder="Street Address"
                                    className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">City</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                    required
                                >
                                    <option value="">Select City</option>
                                    {palestinianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Note</label>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Add a note (optional)"
                                    className="w-full border border-gray-300 text-gray-700 p-3 rounded-3xl"
                                    rows="4"
                                />
                            </div>
                            <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-3xl mt-6">Complete Order</button>
                        </form>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/3 bg-white rounded-lg border-green-400 border p-6 h-full">
                        <div className="font-bold text-xl py-4 border-b pl-3 md:text-2xl">
                            Order Summary
                        </div>
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className='text-gray-600'>Items Count</div>
                            <div className='font-semibold text-sm lg:text-lg'>{products.reduce((total, product) => total + product.quantity, 0)}</div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className='text-gray-600'>Subtotal</div>
                            <div className='font-semibold text-sm lg:text-lg'>${subtotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className='text-gray-600'>Tax</div>
                            <div className='font-semibold text-sm lg:text-lg'>${tax.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className='text-gray-600'>Coupon Discount</div>
                            <div className='font-semibold text-sm lg:text-lg'>-${couponDiscount.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className='text-gray-600'>Shipping Total</div>
                            <div className='font-semibold text-sm lg:text-lg'>${shippingTotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 border-t">
                            <div className='font-bold text-lg lg:text-xl'>Total</div>
                            <div className='font-bold text-lg lg:text-xl'>${total.toFixed(2)}</div>
                        </div>
                        <div className="w-full flex justify-start">
                            <button onClick={handleSubmit} className="w-80 mx-auto text-white py-4 rounded-3xl bg-green-700 hover:bg-green-800 my-4 md:w-full mt-14">Complete Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
