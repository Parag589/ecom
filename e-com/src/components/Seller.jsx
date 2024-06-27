import React, { useState, useEffect } from "react";
import axios from "axios";

const Seller = () => {
  const [productname, setProductname] = useState("");
  const [productdescription, setProductDescription] = useState("");
  const [price, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sellerProducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/products/${editingProduct._id}`,
          { productname, productdescription, price }
        );
      } else {
        await axios.post("http://localhost:5000/createProduct", {
          productname,
          productdescription,
          price,
        });
      }
      fetchProducts();
      setProductname("");
      setProductDescription("");
      setProductPrice("");
      setEditingProduct(null);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleEdit = (product) => {
    setProductname(product.productname);
    setProductDescription(product.productdescription);
    setProductPrice(product.price);
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="grid w-full grid-cols-2">
      <div>
        <div class="relative mx-auto w-full bg-white">
         
          <div class="grid min-h-screen ">
            <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover"
                  />
                <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
              </div>
              
              {/* ----------------------------------------products------------------------------------------ */}
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    <div class="relative mt-6">
                      <ul class="space-y-5">
                        <li class="flex justify-between">
                          <div class="inline-flex">
                            <img
                              src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhhaXIlMjBkcnllcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                              alt=""
                              class="max-h-16"
                            />
                            <div class="ml-3">
                              <p class="text-base font-semibold text-white">
                                {product.productname}
                              </p>
                              <p class="text-sm font-medium text-white text-opacity-80">
                                {product.productdescription}
                              </p>
                            </div>
                          </div>
                          <p class="text-sm font-semibold text-white">
                            ${product.price}
                          </p>

                          <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() => handleDelete(product._id)}
                              type="button"
                              class="flex rounded p-2 text-center text-white transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              ❌
                            </button>

                            <button
                              onClick={() => handleEdit(product)}
                              type="button"
                              class="flex rounded p-2 text-center text-white transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              📝
                            </button>
                          </div>
                        </li>
                        <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* -----------------------------------------------Product Forn------------------------------ */}
      <div class="flex flex-col pt-10 items-center w-full h-full bg-gray-300">
      <h1 class="text-2xl mb-10 md:text-3xl pl-2  border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
        Manage Products
      </h1>
      <div className="  h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
                placeholder="T-Shirt"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Description
              </label>
              <input
                type="text"
                value={productdescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Cotton Fabric"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setProductPrice(e.target.value)}
                required
                placeholder="499"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {editingProduct ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Seller;
