import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for making HTTP requests
import { Link, useNavigate } from 'react-router-dom';
import { initTWE } from "tw-elements";
import logo from "./logo.png";
import { FaCartShopping, FaBoxOpen  } from "react-icons/fa6";
import { useGetCartItemsQuery } from "../services/post";
// import { useGetCartQuery } from "../services/post";


// initTWE(); // Initialize TWE without passing any components

const Navbars = ({ user, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

console.log(user);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const {data, err, isLoading} = useGetCartItemsQuery(user._id)
  // console.log("CARTredux:",data);

  // useEffect(() => {
  //   if (loading) {
  //     setLoading(true);
  //   } else if (err) {
  //     setError("Error fetching cart items");
  //     setLoading(false);
  //   } else if (data) {
  //     setCartItems(data.products || []);
  //     setLoading(false);
  //   }
  // }, [data, err, isLoading]);

  useEffect(() => {
    if (user) {
      console.log("Fetching cart items for user:", user._id);
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${user._id}`);
      setCartItems(response.data.products); // Assuming products are nested within 'products' key in the response
    } catch (err) {
      console.error("Error fetching cart items:", err.message);
    }
  };

  return (
    <>
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-100 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="ml-12 mr-12 flex w-full flex-wrap items-center justify-between px-3">
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item
          >
            <Link to="/" className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0">
              <img src={logo} className="h-12" alt="Logo" loading="lazy" />
            </Link>
          </div>

          <div className="relative flex items-center">
            
          {!user ? (
              <Link to="/signin" className="me-4 flex items-center text-neutral-600 dark:text-white">
                <button
                  type="button"
                  className="text-opacity-70 mt-auto mb-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Log in
                </button>
              </Link>
            ) : (
              <div className="relative mr-5" data-twe-dropdown-ref data-twe-dropdown-alignment="end">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  id="dropdownMenuButton2"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    className="rounded-full h-6 w-6"
                    alt=""
                    loading="lazy"
                  /><p className="mb-1 ml-2 capitalize">Hello, {user.username}!</p>
                </button>
                {isDropdownOpen && (
                  <ul
                    className="mt-2  absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li className="mr">
                      <button
                      className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      >log out</button>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {user && user.role === "seller" ? (
               <Link to="/seller" className="me-4 text-neutral-600 dark:text-white">
               <span className="[&>svg]:w-5">
               <FaBoxOpen />
                 {/* <span className="absolute Pl-7 flex h-4 w-4 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{cartItems.reduce((total, item) => total + item.productquantity, 0)}</span> */}
               </span>
                  
             </Link>
            ):(
              <Link to="/cart" className="me-4 text-neutral-600 dark:text-white">
               <span className="[&>svg]:w-5">
               <FaCartShopping />
                 <span className="absolute Pl-7 flex h-4 w-4 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{cartItems.reduce((total, item) => total + item.productquantity, 0)}</span>
               </span>
                  
             </Link>
            )}

           

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbars;
