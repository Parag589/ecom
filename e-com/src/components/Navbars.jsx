import React from 'react'
import {
  Collapse,
  Dropdown,
  initTWE,
} from "tw-elements";
import logo from './logo.png'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import axios from 'axios';
initTWE({ Collapse, Dropdown });



const Navbars = () => {
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
  return (
    <>
      {/* <!-- Main navigation container --> */}
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-100 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="ml-12 mr-12 flex w-full flex-wrap items-center justify-between px-3">
          {/* <!-- Hamburger button for mobile view --> */}
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <!-- Hamburger icon --> */}
            <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/* <!-- Collapsible navigation container --> */}
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item
          >
            {/* <!-- Logo --> */}
            <a
              className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
              href="#"
            >
              <img src={logo} className="h-12" alt="Logo" loading="lazy" />
            </a>
          </div>

          {/* <!-- Right elements --> */}
          <div className="relative flex items-center">
            {/* <!-- Icon --> */}
            <a className="me-4 text-neutral-600 dark:text-white" href="#">
              <span className="[&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </span>
            </a>

            {/* Login Button */}
            <div
              className="relative bg-re"
              data-twe-dropdown-ref
              data-twe-dropdown-alignment="end"
            >


              {/* <!-- First dropdown trigger --> */}
              <a
                className="me-4 flex items-center text-neutral-600 dark:text-white"
                href="#"
                role="button"
              >

<Dialog>
  <DialogTrigger>Login in</DialogTrigger>
  <DialogContent>

 


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
        
          {/* here */}
        </Card>
      </TabsContent>


      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="name" type="email"/>
            </div>

            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
              <Input id="current" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>


  </DialogContent>
</Dialog>

              </a>
            </div>

            {/* profile container */}
            {/* <div
        className="relative"
        data-twe-dropdown-ref
        data-twe-dropdown-alignment="end">
        <a
          className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
          href="#"
          id="dropdownMenuButton2"
          role="button"
          data-twe-dropdown-toggle-ref
          aria-expanded="false">
          <img
            src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
            className="rounded-full h-6 w-6"
            alt=""
            loading="lazy" />
        </a>
        <ul
          className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
          aria-labelledby="dropdownMenuButton2"
          data-twe-dropdown-menu-ref>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
              href="#"
              data-twe-dropdown-item-ref
              >Log out</a
            >
          </li>
        </ul>
      </div> */}
          </div>
          {/* <!-- Right elements --> */}
        </div>
      </nav>
    </>
  );
}

export default Navbars