import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import StarIcon from '@mui/icons-material/Star';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Snackbar from '../product/Snackbar'; // Import the Snackbar component

const Product = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/api/getProduct.php?productId=${id}`, {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
    
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.itemID,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: `http://localhost/api/${product['mainImagePath']}`
    };

    // Get existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add new item to cart
    const updatedCartItems = [...existingCartItems, cartItem];

    // Update local storage with updated cart items
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    // Show snackbar
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 2000); // Hide after 2 seconds
  };

  if (!product) {
    return <div>Loading...</div>; // Placeholder for when product data is being fetched
  }

  return (
    <div className="pageContainer bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto my-20 px-4 lg:px-10 flex flex-col lg:flex-row">
        <div className="left w-full lg:w-1/2 lg:mr-24">
          <div className="mainImg w-full">
            <img 
              src={`http://localhost/api/${product['mainImagePath']}`}
              alt={product.name} 
              className="object-cover rounded-3xl w-full" 
            />
          </div>
        </div>
        <div className="right w-full lg:w-1/2 mt-10 lg:mt-0">
          <p className="text-xl text-gray-500">{product['category']}</p>
          <div className="heading flex items-center my-2">
            <h2 className="text-2xl font-bold pr-4">{product['title']}</h2>
            <div className="stock bg-amber-100 text-blue-700 px-3 py-1 border border-blue-700 rounded-xl">
              In Stock
            </div>
          </div>
          <div className="rating flex items-center mt-2">
            <StarIcon style={{ color: 'green', fontSize: '25px' }} />
            <p className="inline-block text-gray-700 ml-2">{product.rating} ({product.reviews} Reviews)</p>
          </div>
          <div className="price-container flex items-center mt-4">
            <span className="text-3xl font-semibold text-gray-900">${product['price']}</span>
            {product.discountedPrice && <span className="text-gray-500 line-through ml-4">${product.discountedPrice}</span>}
          </div>
          <p className="short-description text-gray-700 mt-6">{product['description']}</p>
          <div className="quantity mt-4 flex items-center">
            <button onClick={() => handleQuantityChange('decrement')} className="bg-gray-300 text-gray-700 px-4 py-3 rounded-l-lg hover:bg-gray-400">-</button>
            <span className="px-4 py-3 border-t border-b">{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')} className="bg-gray-300 text-gray-700 px-4 py-3 rounded-r-lg hover:bg-gray-400">+</button>
          </div>
          <div className="cta-buttons flex space-x-4 mt-6">
            <button onClick={handleAddToCart} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-400">Add to Cart</button>
          </div>
          <div className="product-details mt-8">
            <h3 className="bg-amber-100 text-blue-700 px-3 py-2 rounded-t-xl">Product Details</h3>
            <table className="table-auto w-full border border-gray-300 rounded-b-xl">
              <tbody>
                {product.details && Object.entries(product.details).map(([feature, description]) => (
                  <tr key={feature} className="border-b">
                    <td className="px-4 py-2 font-semibold text-gray-700">{feature}</td>
                    <td className="px-4 py-2 text-gray-700">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="long-description text-gray-700 mt-6">{product['longDescription']}</p>
          <div className="social-media mt-6 flex space-x-4">
            <a href="https://www.facebook.com" className="text-blue-600 hover:text-blue-800">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" className="text-pink-600 hover:text-pink-800">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <Snackbar message="Item added to cart" show={snackbarVisible} />
      <Footer />
    </div>
  );
}

export default Product;
