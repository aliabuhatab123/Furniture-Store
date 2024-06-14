import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import coffeTable from '../Assets/cofee-table.jpg';
import ContemporaryArmchair from '../Assets/Contemporary armchair.jpg';
import RusticBookshelf from '../Assets/Rustic bookshelf.jpg';
import tvStand from '../Assets/Minimalist TV stand.jpg';
import elegantSideboard from '../Assets/Elegant sideboard.webp';
import cozyLounge from '../Assets/Cozy lounge chair.jpg';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CartPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Get products from local storage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setProducts(cartItems);
    }, []);

    const updateLocalStorage = (updatedProducts) => {
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    };

    const incrementQuantity = (id) => {
        const updatedProducts = products.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        );
        setProducts(updatedProducts);
        updateLocalStorage(updatedProducts);
    };

    const decrementQuantity = (id) => {
        const updatedProducts = products.map(product =>
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        );
        setProducts(updatedProducts);
        updateLocalStorage(updatedProducts);
    };
    const removeProduct = (id) => {
        console.log("Removing product with ID:", id);
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        updateLocalStorage(updatedProducts);
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
    return (
        <div className="pageContainer">
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center">
                {/* Top Bar */}
                <div className="bg-gray-200 py-20 px-8 text-center rounded-t-lg w-full mb-6">
                    <div className="text-4xl font-semibold">Shopping Cart</div>
                    <div className="text-sm text-gray-600 mt-6">Home / Shopping Cart</div>
                </div>

                {/* Main Content Container */}
                <div className="px-2 lg:flex md:px-20 lg:px-28 w-full lg:mb-10">
                    <div className="lg:w-2/3 ">
                        {/* Table */}
                        <div className="bg-white rounded-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-yellow-400 py-2 px-4 border-b grid grid-cols-5">
                                <div className="col-span-1 text-md text-gray-800 flex items-center justify-center md:text-lg lg:text-xl">Product</div>
                                <div className="col-span-1 text-md text-gray-800 flex items-center justify-center md:text-lg lg:text-xl">Price</div>
                                <div className="col-span-1 text-md text-gray-800 flex items-center justify-center md:text-lg lg:text-xl">Quantity</div>
                                <div className="col-span-1 text-md text-gray-800 flex items-center justify-center md:text-lg lg:text-xl">Subtotal</div>
                                <div className="col-span-1 text-md text-gray-800 flex items-center justify-center md:text-lg lg:text-xl">Delete</div>
                            </div>
                            {/* Table Rows */}
                            {products.map(product => (
    <div key={product.id} className="p-4 border-b grid grid-cols-5 items-center">
        {/* Product Info */}
        <div className="col-span-1 flex flex-col items-center">
            <img src={product.image} alt="Product Image" className="rounded-sm shadow mb-2" />
            <p className="text-sm">{product.title}</p>
        </div>
        {/* Product Price */}
        <div className="col-span-1 flex items-center justify-center">${product.price.toFixed(2)}</div>
        {/* Quantity Counter */}
        <div className="col-span-1 flex flex-col items-center justify-center">
            <button onClick={() => decrementQuantity(product.id)} className="border border-gray-300 rounded-lg w-11 py-2 flex justify-center items-center">-</button>
            <span>{product.quantity}</span>
            <button onClick={() => incrementQuantity(product.id)} className="border border-gray-300 rounded-lg w-11 py-2 flex justify-center items-center">+</button>
        </div>
        {/* Subtotal */}
        <div className="col-span-1 flex items-center justify-center">${(product.price * product.quantity).toFixed(2)}</div>
        {/* Close Icon Button */}
        <div className="col-span-1 flex justify-center items-center">
            <button onClick={() => removeProduct(product.id)} className="text-red-500 border border-gray-100 rounded-full w-11 py-5 flex justify-center items-center">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </button>
        </div>
    </div>
))}

                        </div>
                    </div>
               
                    <div className="w-full mt-5 lg:w-1/3 mb-10 lg:ml-10 h-full">
                        <div className="bg-white rounded-lg border-green-400 border lg:p-6 h-full">
                            {/* Summary */}
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
                            <div className=" w-full flex justify-start ">
                                <button className="w-80 mx-auto text-white py-4 rounded-3xl bg-green-700 hover:bg-green-800 my-4 md:w-full mt-14"><Link to="/checkout">Proceed to Checkout</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
