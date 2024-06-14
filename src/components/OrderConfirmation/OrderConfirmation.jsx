import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const OrderConfirmation = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow bg-gray-100 flex items-center justify-center py-20 px-4 md:px-8 lg:px-56">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-16 text-center">
                    <FaCheckCircle className="text-green-500 text-6xl md:text-8xl mb-6 mx-auto" />
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Thank you for your order!</h1>
                    <p className="text-gray-600 text-lg md:text-xl mb-4">Your order has been successfully placed.</p>
                    <p className="text-gray-600 text-lg md:text-xl mb-8">We'll send you a confirmation email shortly.</p>
                    <a 
                        href="/" 
                        className="inline-block bg-green-500 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
