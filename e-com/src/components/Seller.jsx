import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Seller = () => {
  const [productname, setProductname] = useState("");
  const [productdescription, setProductDescription] = useState("");
  const [price, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [photo, setPhoto] = useState(null);

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
      const formData = new FormData();
      formData.append("productname", productname);
      formData.append("productdescription", productdescription);
      formData.append("price", price);
      formData.append("photo", photo);

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/products/${editingProduct._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/createProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product created successfully");
      }
      fetchProducts();
      setProductname("");
      setProductDescription("");
      setProductPrice("");
      setPhoto(null);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to perform operation");
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
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
    <div className="grid w-full grid-cols-2">
      <div>
        <div className="relative mx-auto w-full bg-white">
          <div className="grid min-h-screen">
            <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
              </div>
              
              {/* ----------------------------------------products------------------------------------------ */}
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    <div className="relative mt-6">
                      <ul className="space-y-5">
                        <li className="flex justify-between">
                          <div className="inline-flex">
                            <img
                              src={product.imagePath || "data:image/png;base64,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"}
                              alt={product.productname}
                              className="max-h-16"
                            />
                            <div className="ml-3">
                              <p className="text-base font-semibold text-white">
                                {product.productname}
                              </p>
                              <p className="text-sm font-medium text-white text-opacity-80">
                                {product.productdescription}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            ${product.price}
                          </p>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() => handleDelete(product._id)}
                              type="button"
                              className="flex rounded p-2 text-center text-white transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              ❌
                            </button>

                            <button
                              onClick={() => handleEdit(product)}
                              type="button"
                              className="flex rounded p-2 text-center text-white transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              📝
                            </button>
                          </div>
                        </li>
                        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* -----------------------------------------------Product Form------------------------------ */}
      <div className="flex flex-col pt-10 items-center w-full h-full bg-gray-300">
        <h1 className="text-2xl mb-10 md:text-3xl pl-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-200">
          Manage Products
        </h1>
        <div className="h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
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

export default Seller;
