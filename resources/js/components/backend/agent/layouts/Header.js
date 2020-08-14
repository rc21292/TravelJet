import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import DriveWithUs from '../../../frontend/DriveWithUs';
import HowitWorks from '../../../frontend/HowitWorks';
import CompanyInfo from '../../../frontend/CompanyInfo';
import Queries from '../../../frontend/queries/Index';
import Add from '../../../frontend/queries/Add';


function Header() {


      const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    let stateqq = localStorage["appState"];
      let AppState = JSON.parse(stateqq);
    if (AppState.isLoggedIn == true) {
      setUser(AppState.user);
      setUserId(AppState.user.id);
    }else{
      console.log('kkk');
       setUser(null);
      setUserId(false);
    }   

  },[]);
  
  return (
  <Router>
    <header>
      <div className="container">
          <div className="row">
              <div className="col-sm-3">
                  <div className="logo">
                      <a href="/">
                          <img src="/frontend/image/logo.png" className="img-responsive" alt="Travel Jet" />
                      </a>
                  </div>
              </div>
              <div className="col-sm-9">
                  <ul className="menu list-inline">
                      <li><a href="/browse-bookings">Browse Booking</a>
                      </li>
                      <li><a href="/DriveWithUs">Drive With Us</a>
                      </li>
                      <li><a href="/HowitWorks">How it Works</a>
                      </li>
                      <li><a href="/CompanyInfo">Company Info</a>
                      </li>
                      {(userId === false) && 
                        <li><a href="/login">Login</a></li>
                      }
                      {(userId === false) && 
                        <li ><a href="/register">Register</a></li>
                      }
                      {(userId) &&
                        <li ><a href="/login">My Account</a></li>
                      }    
                  </ul>
              </div>
          </div>
      </div>
  </header>
    <Route exact path='/' component={Home} />
    <Route exact path='/HowitWorks' component={HowitWorks} />
    <Route exact path='/DriveWithUs' component={DriveWithUs} />
    <Route exact path='/CompanyInfo' component={CompanyInfo} />
    <Route exact path='/queries' component={Queries} />
    <Route exact path='/query/add' component={Add} />
  </Router>
  );
}

export default Header;
