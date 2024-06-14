import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';
import './Home.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import BlogSection from './BlogSection';

// Function to sanitize product names
const sanitizeNameForURL = (name) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const shopSectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/api/fetch_products.php');
        console.log('API response:', response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching the products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='Home'>
      <Header />
      <div className="hero-section flex flex-col lg:flex-row lg:px-24 bg-slate-100">
        <div className="left w-full lg:w-1/2 h-auto">
          <div className="the-best">
            <p>The Best Online Furniture Store.</p>
          </div>
          <h2 className='heading text-3xl md:text-5xl mt-5 mb-3 lg:w-2/3 lg:text-6xl'>
            Explore Our Modern Furniture Collection 
          </h2>
          <p className='sub-heading hidden md:flex'>
            We embrace a modern dropshipping model, ensuring each item is delivered directly from our trusted suppliers to your doorstep. Our commitment to customer satisfaction drives us to constantly update our collections, catering to various tastes and interior design trends.
          </p>
          <div className='bottom-left'>
            <div className='shop-hero min-w-52 px-14 py-7'>
              <a href="#shop" onClick={() => scrollToSection(shopSectionRef)}>Shop Now</a>
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
        <div className="right w-full lg:w-1/2 h-auto">
          <div className="productSlider flex flex-col mt-16 md:flex-row md:mt-2">
            <div className="product w-full md:w-1/2">
              <Link to={`http://localhost:3000/categories`}>
                <img src={`http://localhost/api/library/images/products/0_Novogratz+Brittany+4+Shelf+Bookcase+in+Walnut.webp`} className='w-full' />
                <div className='bottom'>
                  <div className="left">
                    <h3>Shelf Bookcase</h3>
                    <p>Shop Over 500+ Items Daily New Collections</p>
                  </div>
                  <div className="right">
                    <div className='open-item'>
                      <a href="">
                        <ArrowOutwardIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="product w-full md:w-1/2">
              <Link to={`http://localhost:3000/categories`}>
                <img src={`http://localhost/api/library/images/products/0_Novogratz+Brittany+End+Table+in+Walnut.webp`} />
                <div className='bottom'>
                  <div className="left">
                    <h3>Living Room Tables</h3>
                    <p>1,200+ Items Tables Different size and high quality</p>
                  </div>
                  <div className="right">
                    <div className='open-item'>
                      <a href="">
                        <ArrowOutwardIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="advantages flex flex-col gap-5 bg-white md:w-5/6 mt-24 mx-14 md:flex-row justify-between align-baseline">
        <div className="advColumn flex">
          <div className="icon pt-2 pr-4">
            <LocalShippingIcon style={{ color: '#824A0F', fontSize: '50px' }} />
          </div>
          <div className="row">
            <h4 className='text-3xl'>Free Shipping</h4>
            <p className='text-xl pt-2'>Free shipping for order above 140 $</p>
          </div>
        </div>
        <div className="advColumn flex">
          <div className="icon pt-2 pr-4">
            <PaymentIcon style={{ color: '#824A0F', fontSize: '50px' }} />
          </div>
          <div className="row">
            <h4 className='text-3xl'>Multiple Payments</h4>
            <p className='text-xl pt-2'>Free shipping for order above 140 $</p>
          </div>
        </div>
        <div className="advColumn flex">
          <div className="icon pt-2 pr-4">
            <SupportAgentIcon style={{ color: '#824A0F', fontSize: '50px' }} />
          </div>
          <div className="row">
            <h4 className='text-3xl'>24x7 Support</h4>
            <p className='text-xl pt-2'>Available support in all days</p>
          </div>
        </div>
      </div> */}
      <div ref={shopSectionRef} className="sectionHeading mb-14 mx-14 mt-20 text-3xl">
        <h2 className='text-3xl font-bold'>Shop Products</h2>
      </div>
      <div className="featuredProducts mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:mx-14">
        {currentProducts.map(product => (
          <Link to={`/product/${product.id}/${sanitizeNameForURL(product.name)}`} key={product.id} className="product-link transform transition-transform duration-300 hover:-translate-y-4">
            <div className="product mb-14 px-6 rounded-lg shadow-md bg-white">
              <img src={product.image_url} alt={product.name} className="product-image rounded-t-lg" />
              <div className="middle flex mt-3 justify-between">
                <p className='text-sm'>{product.category}</p>
                <div className='rating flex justify-center'>
                  <StarIcon style={{ color: 'green' }} /> {product.rating}
                </div>
              </div>
              <div className='bottom flex flex-col'>
                <div className="left">
                  <h3 className='text-xl font-bold'>{product.name}</h3>
                  <div className="details flex">
                    <p className='price text-lg'>${product.price}</p>
                    <p className='ml-3 line-through text-lg'>${product.original_price}</p>
                  </div>
                </div>
                <div className="right">
                  <div className='open-item'>
                    <ArrowOutwardIcon />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center my-8">
      <button
        className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 ml-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
      {/* <BlogSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
