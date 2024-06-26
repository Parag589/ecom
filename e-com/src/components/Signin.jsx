import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Signin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernames, setUsernames] = useState("");
  const [passwords, setPasswords] = useState("");
  const [role, setRole] = useState("user"); // Default role to user
  const [newPassword, setNewPassword] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signin", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      })
      .catch((error) => alert(error.response.data.msg));
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", { usernames, passwords, role })
      .then((response) => alert(response.data.msg))
      .catch((error) => alert(error.response.data.msg));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/forgot-password", { username, newPassword })
      .then((response) => {
        alert(response.data.msg);
        // Optionally, redirect or show a success message
      })
      .catch((error) => alert(error.response.data.msg));
  };

  const toggleForgotPasswordMode = () => {
    setForgotPasswordMode(!forgotPasswordMode);
  };

  return (
    <>
      <Tabs defaultValue="account" className="w-[400px] ml-auto mr-auto mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Sign in</TabsTrigger>
          <TabsTrigger value="password">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{forgotPasswordMode ? "Forgot Password" : "Sign in"}</CardTitle>
            </CardHeader>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form onSubmit={forgotPasswordMode ? handleForgotPassword : handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={forgotPasswordMode ? newPassword: password  }
                      onChange={forgotPasswordMode ? (e) => setNewPassword(e.target.value) : (e) => setPassword(e.target.value) }
                      required
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <button className="text-sm underline text-gray-600 font-semibold" type="button" onClick={toggleForgotPasswordMode}>
                    {forgotPasswordMode ? "Sign in" : "Forgot Password"}
                  </button>

                  <button
                    type="submit"
                    className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
            </CardHeader>

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form onSubmit={handleSubmit2} className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={usernames}
                      onChange={(e) => setUsernames(e.target.value)}
                      placeholder="Username"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={passwords}
                      onChange={(e) => setPasswords(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit2}
                    className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </Card>
        </TabsContent>

      </Tabs>
    </>
  );
}

export default Signin;
