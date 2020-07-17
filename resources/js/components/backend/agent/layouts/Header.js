import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Header() {
return (
  <nav className="navbar ms-navbar">
  <div className="ms-aside-toggler ms-toggler pl-0" data-target="#ms-side-nav" data-toggle="slideLeft">
    <span className="ms-toggler-bar bg-primary" />
    <span className="ms-toggler-bar bg-primary" />
    <span className="ms-toggler-bar bg-primary" />
  </div>
  <div className="logo-sn logo-sm ms-d-block-sm">
    <a className="pl-0 ml-0 text-center navbar-brand mr-0" href="index.html"><img src="https://via.placeholder.com/84x41" alt="logo" /> </a>
  </div>
  <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
    <li className="ms-nav-item ms-search-form pb-0 py-0">
      <form className="ms-form" method="post">
        <div className="ms-form-group my-0 mb-0 has-icon fs-14">
          <input type="search" className="ms-form-input" name="search" placeholder="Search here..." defaultValue />
          <i className="flaticon-search text-disabled" />
        </div>
      </form>
    </li>
    <li className="ms-nav-item dropdown">
      <a href="#" className="text-disabled ms-has-notification" id="mailDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flaticon-mail" /></a>
      <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="mailDropdown">
        <li className="dropdown-menu-header">
          <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Mail</span></h6><span className="badge badge-pill badge-success">3 New</span>
        </li>
        <li className="dropdown-divider" />
        <li className="ms-scrollable ms-dropdown-list">
          <a className="media p-2" href="#">
            <div className="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
              <img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
            </div>
            <div className="media-body">
              <span>Hey man, looking forward to your new project.</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 30 seconds ago</p>
            </div>
          </a>
          <a className="media p-2" href="#">
            <div className="ms-chat-status ms-status-online ms-chat-img mr-2 align-self-center">
              <img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
            </div>
            <div className="media-body">
              <span>Dear John, I was told you bought Greendash! Send me your feedback</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 28 minutes ago</p>
            </div>
          </a>
          <a className="media p-2" href="#">
            <div className="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
              <img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
            </div>
            <div className="media-body">
              <span>How many people are we inviting to the dashboard?</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 6 hours ago</p>
            </div>
          </a>
        </li>
        <li className="dropdown-divider" />
        <li className="dropdown-menu-footer text-center">
          <a href="pages/apps/email.html">Go to Inbox</a>
        </li>
      </ul>
    </li>
    <li className="ms-nav-item dropdown">
      <a href="#" className="text-disabled ms-has-notification" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flaticon-bell" /></a>
      <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
        <li className="dropdown-menu-header">
          <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Notifications</span></h6><span className="badge badge-pill badge-info">4 New</span>
        </li>
        <li className="dropdown-divider" />
        <li className="ms-scrollable ms-dropdown-list">
          <a className="media p-2" href="#">
            <div className="media-body">
              <span>12 ways to improve your crypto dashboard</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 30 seconds ago</p>
            </div>
          </a>
          <a className="media p-2" href="#">
            <div className="media-body">
              <span>You have newly registered users</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 45 minutes ago</p>
            </div>
          </a>
          <a className="media p-2" href="#">
            <div className="media-body">
              <span>Your account was logged in from an unauthorized IP</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 2 hours ago</p>
            </div>
          </a>
          <a className="media p-2" href="#">
            <div className="media-body">
              <span>An application form has been submitted</span>
              <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 1 day ago</p>
            </div>
          </a>
        </li>
        <li className="dropdown-divider" />
        <li className="dropdown-menu-footer text-center">
          <a href="#">View all Notifications</a>
        </li>
      </ul>
    </li>
    <li className="ms-nav-item m-0 display-none-sm">
      <label className="ms-switch m-0">
        <input type="checkbox" id="remove-quickbar" defaultChecked />
        <span className="ms-switch-slider round" />
      </label>
    </li>
    <li className="ms-nav-item ms-nav-user dropdown">
      <a href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img className="ms-user-img ms-img-round float-right" src="https://via.placeholder.com/270x270" alt="people" /> </a>
      <ul className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
        <li className="dropdown-menu-header">
          <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, Anny Farisha</span></h6>
        </li>
        <li className="dropdown-divider" />
        <li className="ms-dropdown-list">
          <a className="media fs-14 p-2" href="pages/prebuilt-pages/user-profile.html"> <span><i className="flaticon-user mr-2" /> Profile</span> </a>
          <a className="media fs-14 p-2" href="pages/apps/email.html"> <span><i className="flaticon-mail mr-2" /> Inbox</span> <span className="badge badge-pill badge-info">3</span> </a>
          <a className="media fs-14 p-2" href="pages/prebuilt-pages/user-profile.html"> <span><i className="flaticon-gear mr-2" /> Account Settings</span> </a>
        </li>
        <li className="dropdown-divider" />
        <li className="dropdown-menu-footer">
          <a className="media fs-14 p-2" href="pages/prebuilt-pages/lock-screen.html"> <span><i className="flaticon-security mr-2" /> Lock</span> </a>
        </li>
        <li className="dropdown-menu-footer">
          <a className="media fs-14 p-2" href="/logout"> <span><i className="flaticon-shut-down mr-2" /> Logout</span> </a>
        </li>
      </ul>
    </li>
  </ul>
  <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler" data-toggle="slideDown" data-target="#ms-nav-options">
    <span className="ms-toggler-bar bg-primary" />
    <span className="ms-toggler-bar bg-primary" />
    <span className="ms-toggler-bar bg-primary" />
  </div>
</nav>

  );
}

export default Header;
