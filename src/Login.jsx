import React, { useContext, useState } from 'react';
import './Login.css'; // Import your CSS file
import chat from '../src/assets/chat.svg'
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from './Store';
const Login = () => {
//   const [username, setUsername] = useState('');
const {username, setUsername} =  useContext(UserContext)
console.log(username)
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();


    // You can implement your authentication logic here
    // For simplicity, I'll just check if username is not empty
    if (username.trim() !== '') {
   
        navigate("/chat-page")
    //   setLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
<img src={chat} alt='Chat Icon' className="logo" />
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          {/* <button onClick={() => setLoggedIn(false)}>Logout</button> */}
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
