import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart items:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return; // Ensure quantity doesn't go below 1

    try {
      const response = await axios.put(`http://localhost:5000/cart/${user._id}/product/${productId}`, { quantity });
      console.log("Quantity updated successfully:", response.data); // Log the response
      // Update the local state with the updated quantity
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productid === productId ? { ...item, productquantity: quantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err.message); // Log the error
      setError(err.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${user._id}/product/${productId}`);
      console.log("Item removed successfully:", response.data);
      // Filter out the removed item from the local state
      setCartItems((prevItems) => prevItems.filter((item) => item.productid !== productId));
    } catch (err) {
      console.error("Error removing item:", err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading cart items: {error}</p>;
  }

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  {cartItems.map((item) => (
                    <li key={item._id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0">
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={item.productImage} alt={item.productname} />
                      </div>
                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">{item.productname}</p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.productSize}</p>
                          </div>
                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${item.productprice}</p>
                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white" onClick={() => handleQuantityChange(item.productid, item.productquantity - 1)}>-</button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.productquantity}</div>
                                <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white" onClick={() => handleQuantityChange(item.productid, item.productquantity + 1)}>+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900" onClick={() => handleRemoveItem(item.productid)}>
                            <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">${cartItems.reduce((total, item) => total + item.productprice * item.productquantity, 0)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">Free</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> {cartItems.reduce((total, item) => total + item.productprice * item.productquantity, 0)}</p>
              </div>
              <div className="mt-6 text-center">
                <button type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
