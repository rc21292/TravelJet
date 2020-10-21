import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function Sidebar() {
return (
 <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link" href="/admin">
            <span>Dashboard</span></a>
        </li>
        <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBookings" aria-expanded="true" aria-controls="collapseBookings">
          <span>Booking</span>
        </a>
        <div id="collapseBookings" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href="/admin/bookings">Upcoming Booking</a>
            <a className="collapse-item" href="/admin/booked-bookings">Booked</a>
            <a className="collapse-item" href="/admin/cancelled-bookings">Cancelled</a>
          </div>
        </div>
      </li>
        <li className="nav-item">
          <a className="nav-link active" href="/admin/agents">
            <span>Agents</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/admin/customers">
            <span>Customers</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/transaction-history">
            <span>Transaction History</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/commissions">
            <span>Commissions</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/credits">
            <span>Manage Credits</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/payouts">
            <span>Payout</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/informationpages">
            <span>Information Pages</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/userprofiles">
            <span>User Profile</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/notifications">
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