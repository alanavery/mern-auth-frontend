import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
require('dotenv').config();
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = { email, password };
      let response = await axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData);
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      props.nowCurrentUser(decoded);
    } catch (err) {
      console.log(err);
    }
  };

  if (props.user) return <Redirect to="/profile" />;

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <input className="btn btn-primary float-right" type="submit" value="Submit" />
            {/* <button className="btn btn-primary float-right" type="submit">Submit</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
