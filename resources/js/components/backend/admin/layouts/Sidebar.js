import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Sidebar() {
return (
 <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link" href="/admin">
            <span>Dashboard</span></a>
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