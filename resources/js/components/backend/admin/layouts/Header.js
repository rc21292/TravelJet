import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import Wallet from '../Wallet';
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
         <header>
        <div className="container-fluid">
          <div className="row">
            {/* LOGO */}
            <div className="col-sm-3">
              <div className="logo">
                <a href="http://n2rtech.com/traveljetadminpanel/">
                  <img src="/backend/image/logo.png" className="img-responsive" alt="Travel Jet" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
        <Route exact path="/admin/bookings" component={Bookings} />
        <Route exact path="/admin/settings" component={CoinSetting} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/user/:id" component={User} />
        <Route exact path="/admin/wallet" component={Wallet} />
        <Route exact path="/admin/profile" component={Profile} />
        <Route exact path="/admin/profile/edit" component={EditProfile} />
        <Route exact path="/admin/portfolio/edit" component={EditPortfolio} />
</div>

  );
}

export default Header;
