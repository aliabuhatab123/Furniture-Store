import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/api/getCategoriesWithProducts.php', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const productsPerPage = 4; // Number of products per page

  const totalPages = Math.ceil(categories[activeTab]?.products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 mr-4 text-lg font-semibold ${
                index === activeTab ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setActiveTab(index);
                setCurrentPage(1);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{categories[activeTab]?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {categories[activeTab]?.products
              .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
              .map(product => (
                <Link
                  to={`/product/${product.id}/${product.title}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-4"
                >
                  <img
                    src={`http://localhost/api/${product.image}`}
                    alt={product.title}
                    className="w-full h-2/3 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-700 mt-1">${product.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
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
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
