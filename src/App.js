import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Welcome from './components/Welcome';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

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
    <BrowserRouter>
      <div className="App">
        <Nav handleLogout={handleLogout} isAuth={isAuthenticated} />
        <div className="container mt-5">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={(props) => {
                return (
                  <Login
                    {...props}
                    nowCurrentUser={nowCurrentUser}
                    setIsAuthenticated={setIsAuthenticated}
                    user={currentUser}
                  />
                );
              }}
            />
            <Route path="/about" component={About} />
            <PrivateRoute path="/profile" component={Profile} user={currentUser} />
            <Route exact path="/" component={Welcome} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
