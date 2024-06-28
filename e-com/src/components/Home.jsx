import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        imagePath: product.imagePath,
      });
      console.log(response.data.msg);
      toast.success("Product added to cart!");
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
              onClick={() => openPopup(product)} 
            >
              <img
              className="object-cover w-full" 
                src={product.imagePath || "data:image/png;base64,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"}
                alt={product.productname}
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
                  src={selectedProduct?.imagePath || "data:image/png;base64,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"}
                  alt={selectedProduct?.productname}
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

       {/* Toast Container */}
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Home;
