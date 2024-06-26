import './App.css';
import Navbars from './components/Navbars';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Cart from './components/Cart';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging log
    if (token) {
      axios.get('http://localhost:5000/user', {
        headers: { 'x-auth-token': token }
      })
      .then(response => {
        console.log('User data:', response.data); // Debugging log
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error); // Debugging log
        setUser(null);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div>
      <Navbars user={user} handleLogout={handleLogout}/>
      <h1>home page</h1>

      
      <Routes>
        <Route
          path="/signin"
          element={user ? <Navigate to="/cart" /> : <Signin setUser={setUser} />}
        />
        <Route
          path="/cart"
          element={
            user ? (
              <div>
                <h1>Hello, {user.username}!</h1>
                <button onClick={handleLogout}>Logout</button>
                <Cart />
              </div>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
