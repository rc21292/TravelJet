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
    <a href={'/customer/bookings'}>
        <span><i className="fa fa-ticket" aria-hidden="true"></i>Bookings</span>
      </a>
    </li>
    <li className="menu-item">
    <a href={'/customer/transactions'}>
        <span><i className="fas fa-dollar-sign" />Transaction History</span>
      </a>
    </li>
    <li className="menu-item">
    <a href={'/customer/wallet'}>
        <span><i className="fas fa-dollar-sign" />Wallet</span>
      </a>
    </li>
    <li className="menu-item">
    <a href={'/customer/notifications'}>
        <span><i className="fa fa-bell" aria-hidden="true"></i>Notifications</span>
      </a>
    </li>
    <li className="menu-item">
    <a href={'/customer/profile'}>
        <span><i className="fa fa-user" aria-hidden="true"></i>Profile</span>
      </a>
    </li>
    <li className="menu-item">
    <a href="/logout">
        <span><i className="flaticon-shut-down mr-2"></i>Logout</span>
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