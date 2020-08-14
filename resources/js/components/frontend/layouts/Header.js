import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import DriveWithUs from '../DriveWithUs';
import HowitWorks from '../HowitWorks';
import CompanyInfo from '../CompanyInfo';
import BrowseBookings from '../BrowseBookings';
import CustomerBookings from '../CustomerBookings';
import Qutations from '../Qutations';
import Booked from '../Booked';
import Bookings from '../Bookings';
import BookingDetails from '../BookingDetails';
import Queries from '../queries/Index';
import Add from '../queries/Add';
import GoogleeAdd from '../queries/GoogleeAdd';


function Header(props) {


    const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(props.user_id);

  useEffect(() => {
    let stateqq = localStorage["appState"];
      let AppState = JSON.parse(stateqq);
    if (AppState.isLoggedIn == true) {
      setUser(AppState.user);
      setUserId(AppState.user.id);
      console.log(AppState.user.id);
      console.log('jhj');
    }else{
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
                    <li><Link to="/DriveWithUs">Drive With Us</Link>
                    </li>
                    <li><Link to="/HowitWorks">How it Works</Link>
                    </li>
                    <li><Link to="/CompanyInfo">Company Info</Link>
                    </li>
                    <li className="calltoAction"><a className="btn btn-primary" href="/query/add">Book Now</a>
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
                    {(userId) &&
                      <li ><a href="/logout">Logout</a></li>
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
      <Route exact path='/browse-bookings' component={BrowseBookings} />
      <Route exact path='/booking-details/:id' component={BookingDetails} />
      <Route exact path='/customer-booking/:id' component={CustomerBookings} />
      <Route exact path='/quotations/:id' component={Qutations} />
      <Route exact path='/booked' component={Booked} />
      <Route exact path='/Bookings' component={Bookings} />
      <Route exact path='/queries' component={Queries} />

      <Route exact path="/query/add"><Add user_id={userId}/></Route>
      <Route exact path='/query/addgoogle' component={GoogleeAdd} />
  </Router>
  );
}

export default Header;
