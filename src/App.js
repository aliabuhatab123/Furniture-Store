import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header.jsx'
import Shop from './components/Shop/Shop.jsx'
import Offers from './components/Offers/Offers.jsx'
import Categories from './components/Categories/Categories.jsx'
import ContactUs from './components/ContactUs/ContactUs.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import Home from './components/Home/Home.jsx'
import Favorite from './components/Favorite/Favorite.jsx'
import Product from './components/product/Product.jsx'
import LoginPage from './components/Client/Login/LoginPage.jsx'
import SignUpPage from './components/Client/Signup/SignUpPage.jsx'
import CartPage from './components/CartPage/CartPage.jsx'
import UserDashboard from './components/Client/Account/UserDashboard.jsx'
import CheckoutPage from './components/CheckoutPage/CheckoutPage.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation.jsx';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id/:name" element= {<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/account' element={<UserDashboard />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
