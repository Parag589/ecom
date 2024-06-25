import React, { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function Signin({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signin', { username, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
            })
            .catch(error => alert(error.response.data.msg));
    };

    const [usernames, setUsernames] = useState('');
    const [passwords, setPasswords] = useState('');

    const handleSubmit2 = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', { usernames, passwords })
            .then(response => alert(response.data.msg))
            .catch(error => alert(error.response.data.msg));
    };

    return (
      <>
        <Tabs defaultValue="account" className="w-[400px] ml-auto mr-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign in</TabsTrigger>
            <TabsTrigger value="password">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Sign in</CardTitle>
              </CardHeader>

              {/* <div class="bg-gray-50 dark:bg-gray-900 flex flex-col  px-6 py-8  lg:py-0"> */}
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  {/* <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in
              </h1> */}

                  <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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

              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  {/* <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in
              </h1> */}

                  <form onSubmit={handleSubmit2} class="space-y-4 md:space-y-6">
                    <div>
                      <label
                        for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="text"
                        value={usernames}
                        onChange={(e) => setUsernames(e.target.value)}
                        placeholder="Username"
                        required
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        value={passwords}
                        onChange={(e) => setPasswords(e.target.value)}
                        required
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 



        <form onSubmit={handleSubmit}>
            <h2>Signin</h2>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required 
            />
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required 
            />
            <button type="submit">Signin</button>
        </form> */}
      </>
    );
}

export default Signin;
