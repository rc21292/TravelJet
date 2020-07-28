import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import Wallet from '../Wallet';
import Notifications from '../Notifications';
import TransactionHistory from '../transactions/TransactionHistory';
import CoinSetting from '../settings/CoinSetting';
import Bookings from '../bookings/Bookings';
import Users from '../users/Users';
import User from '../users/User';
import Profile from '../users/Profile';
import EditProfile from '../users/EditProfile';
import EditPortfolio from '../users/EditPortfolio';

function Header() {

    const [user, setUser] = useState(false);

    useEffect(() => {

      let stateqq = localStorage["appState"];
      if (stateqq) {
        let AppState = JSON.parse(stateqq);
        setUser(AppState.user);
      }   
    },[]); 

return (
  <div>
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
      <li className="ms-nav-item ms-nav-user dropdown">    
    <a href="#" className="text-disabled ms-has-notification" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flaticon-bell"></i></a>
    </li>
    <li className="ms-nav-item ms-nav-user dropdown">
      <a href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img className="ms-user-img ms-img-round float-right" src="https://via.placeholder.com/270x270" alt="people" /> </a>
      <ul className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
        <li className="dropdown-menu-header">
          <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, {user.name} ({user.role})</span></h6>
        </li>
        <li className="dropdown-divider" />
        <li className="ms-dropdown-list">
          <a className="media fs-14 p-2" href="admin/profile"> <span><i className="flaticon-gear mr-2" /> Account Settings</span> </a>
        </li>
        <li className="dropdown-divider" />
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
        <Route exact path="/admin/bookings" component={Bookings} />
        <Route exact path="/admin/settings" component={CoinSetting} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/user/:id" component={User} />
        <Route exact path="/admin/transactions" component={TransactionHistory} />
        <Route exact path="/admin/wallet" component={Wallet} />
        <Route exact path="/admin/profile" component={Profile} />
        <Route exact path="/admin/profile/edit" component={EditProfile} />
        <Route exact path="/admin/portfolio/edit" component={EditPortfolio} />
        <Route exact path="/admin/notifications" component={Notifications} />
</div>

  );
}

export default Header;
