import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Sidebar() {
  return (
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
{/* Sidebar - Brand */}
<a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
<div className="sidebar-brand-icon">
<img src="/frontend/image/icons/user.png" alt="user" />
</div>
<div className="sidebar-brand-text mx-3">Hello</div>
</a>
{/* Divider */}
<hr className="sidebar-divider my-0" />
{/* Nav Item - Pages Collapse Menu */}

<li className="nav-item active">
	<a className="nav-link" href="/customer">
  	<span>Dashboard</span></a>
</li>

<li className="nav-item">
<a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
<span>My Booking</span>
</a>
<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
<div className="bg-white py-2 collapse-inner rounded">
<a className="collapse-item" href="/customer/bookings">Booking</a>
<a className="collapse-item" href="/customer/cancelled-bookings">Cancelled Booking</a>
<a className="collapse-item" href="/customer/quotations">Quotation</a>
<a className="collapse-item" href="/customer/reviews">Reviews</a>
</div>
</div>
</li>
{/* Nav Item - Utilities Collapse Menu */}
<li className="nav-item">
<a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
<span>Account Setting</span>
</a>
<div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
<div className="bg-white py-2 collapse-inner rounded">
<a className="collapse-item" href="/customer/personal-information">Profile Information</a>
<a className="collapse-item" href="/customer/manage-address">Manage Address</a>
</div>
</div>
</li>
{/* Nav Item - Charts */}
<li className="nav-item">
<a className="nav-link" href="/customer/wallet">
<span>My Wallet</span></a>
</li>
<li className="nav-item">
    <a className="nav-link" href="/customer/invoices">
      <span>Invoices</span></a>
  </li>
{/* Nav Item - Tables */}
<li className="nav-item">
<a className="nav-link" href="/chatify">
<span>Inbox</span></a>
</li>
<li className="nav-item">
<a className="nav-link" href="/customer/notifications">
<span>Notification</span></a>
</li>
<li className="nav-item">
<a className="nav-link" href="/logout">
<span>Logout</span></a>
</li>
<hr className="sidebar-divider d-none d-md-block" />
</ul>


);
}


export default Sidebar