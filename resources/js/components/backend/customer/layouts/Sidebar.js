import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Sidebar() {
return (
  <div>{/* Sidebar Navigation Left */}
<aside id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
  {/* Logo */}
  <div className="logo-sn ms-d-block-lg">
    <a className="pl-0 ml-0 text-center" href="/"> <img src="https://via.placeholder.com/216x62" alt="logo" /> </a>
  </div>
  {/* Navigation */}
  <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
    {/* Dashboard */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#dashboard" aria-expanded="false" aria-controls="dashboard">
        <span><i className="material-icons fs-16">dashboard</i>Dashboard </span>
      </a>
      <ul id="dashboard" className="collapse" aria-labelledby="dashboard" data-parent="#side-nav-accordion">
        <li> <a href="/customer">Dashboard</a> </li>
      </ul>
    </li>
    {/* /Dashboard */}
   
    {/* Transaction */}
    <li className="menu-item">
    <Link to={'/customer/transactions'}>
        <span><i className="fas fa-dollar-sign" />Transaction History</span>
      </Link>
    </li>
    <li className="menu-item">
    <Link to={'/customer/wallet'}>
        <span><i className="fas fa-dollar-sign" />Wallet</span>
      </Link>
    </li>
    <li className="menu-item">
    <Link to={'/customer/notifications'}>
        <span><i className="fas fa-dollar-sign" />Notifications</span>
      </Link>
    </li>
    <li className="menu-item">
    <Link to={'/customer/profile'}>
        <span><i className="fas fa-dollar-sign" />Profile</span>
      </Link>
    </li>
    <li className="menu-item">
    <a href="/logout">
        <span><i className="fas fa-dollar-sign" />Logout</span>
      </a>
    </li>
    {/* /Pricing */}
    </ul>
</aside>
{/* Sidebar Right */}

</div>
  );
}


export default Sidebar