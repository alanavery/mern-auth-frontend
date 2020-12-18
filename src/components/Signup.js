import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password === confirmPassword) {
        const newUser = { name, email, password };
        let response = await axios.post(`${REACT_APP_SERVER_URL}/users/register`, newUser);
        console.log(response);
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) return <Redirect to="/login" />;

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
            </div>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
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

export default Signup;
