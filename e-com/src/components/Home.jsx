import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product details
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch products when the component mounts and on page change
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/products?page=${page}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      // Redirect to signin page if user is null
      navigate("/signin");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/addToCart", {
        userid: user._id,
        productid: product._id,
        productname: product.productname,
        productprice: product.price,
        productquantity: 1, // Default quantity
      });
      console.log(response.data.msg);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const openPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid w-full grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative m-10 flex w-auto max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <a
              className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl"
              href="#"
              onClick={() => openPopup(product)} // Open popup on product click
            >
              <img
                className="object-cover"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="product image"
              />
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-sm tracking-tight text-slate-900">
                  {product.productname}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <div className="flex justify-end mb-4">
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closePopup}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>




            <div className="relative flex w-auto  flex-col overflow-hidden rounded-lg border shadow-md" >
            <a
              className="relative mx-3 mt-3 flex  items-center justify-center h-48 overflow-hidden rounded-xl">
              <img
                className="object-cover"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="product image"
              />
            </a>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg tracking-tight mb-2 text-slate-900">
                {selectedProduct?.productname}
                </h5>
             
                <h5 className="text-sm tracking-tight text-slate-900">
                {selectedProduct?.productdescription}
                </h5>
              
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-xl font-bold text-slate-900">
                  ${selectedProduct?.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <nav aria-label="Page Navigation" className="mx-auto my-10 flex max-w-md justify-between space-x-2 rounded-md bg-white py-2">
        <a
          href="#"
          className={`flex items-center space-x-1 font-medium hover:text-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
          <span>prev</span>
        </a>
        <ul className="flex">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNum => (
            <li key={pageNum}>
              <a
                href="#"
                className={`px-2 text-lg font-medium sm:px-3 ${pageNum === currentPage ? 'border-b-2 border-gray-400 text-gray-400' : 'hover:text-blue-400'}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className={`flex items-center space-x-1 font-medium hover:text-gray-600  ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span>next</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </a>
      </nav>
    </>
  );
};

export default Home;
