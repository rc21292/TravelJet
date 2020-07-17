import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import DriveWithUs from '../DriveWithUs';
import HowitWorks from '../HowitWorks';
import CompanyInfo from '../CompanyInfo';
import Queries from '../queries/Index';
import Add from '../queries/Add';


function Header() {
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
    <li><Link to="/DriveWithUs">Drive With Us</Link>
    </li>
    <li><Link to="/HowitWorks">How it Works</Link>
    </li>
    <li><Link to="/CompanyInfo">Company Info</Link>
    </li>
    <li className="calltoAction"><a className="btn btn-primary" href="/query/add">Book Now</a>
    </li>
        <li><a href="/login">Login</a></li>
        <li ><a href="/register">Register</a></li>
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
