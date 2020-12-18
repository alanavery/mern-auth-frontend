import React, { Components, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Welcome from './components/Welcome';
import Nav from './components/Nav';

import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwtDecode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser('');
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Nav handleLogout={handleLogout} isAuth={isAuthenticated} />
      <Welcome />
    </div>
  );
}

export default App;
