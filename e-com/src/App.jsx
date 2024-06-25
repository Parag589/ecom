import './App.css'
import Navbars from './components/Navbars'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Signup from './components/Signup';
import Signin from './components/Signin';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          axios.get('http://localhost:5000/user', {
              headers: { 'x-auth-token': token }
          })
          .then(response => setUser(response.data))
          .catch(() => setUser(null));
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('token');
      setUser(null);
  };

  return (
    <>
    <Navbars/>
    <div>
            {user ? (
                <div>
                    <h1>Hello, {user.username}!</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Signup />
                    <Signin setUser={setUser} />
                </div>
            )}
        </div>
    </>
  )
}

export default App
