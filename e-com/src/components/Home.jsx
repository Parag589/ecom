import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
