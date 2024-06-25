import React, { useState } from 'react';
import axios from 'axios';


function Signup() {
    const [usernames, setUsernames] = useState('');
    const [passwords, setPasswords] = useState('');

    const handleSubmit2 = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', { usernames, passwords })
            .then(response => alert(response.data.msg))
            .catch(error => alert(error.response.data.msg));
    };

    return (
        <form onSubmit={handleSubmit2}>
            <h2>Signup</h2>
            <input 
                type="text" 
                value={usernames}
                onChange={(e) => setUsernames(e.target.value)}
                placeholder="Username"
                required 
            />
            <input 
                type="password" 
                value={passwords}
                onChange={(e) => setPasswords(e.target.value)}
                placeholder="Password"
                required 
            />
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
