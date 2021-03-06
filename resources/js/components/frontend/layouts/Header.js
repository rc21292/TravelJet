import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import DriveWithUs from '../DriveWithUs';
import HowitWorks from '../HowitWorks';
import CompanyInfo from '../CompanyInfo';
import BrowseBookings from '../BrowseBookings';
import CustomerBookings from '../CustomerBookings';
import Qutations from '../Qutations';
import DownloadQuote from '../DownloadQuote';
import Booked from '../Booked';
import Cancelled from '../Cancelled';
import CancelledBooking from '../CancelledBooking';
import InvoicePdf from '../InvoicePdf';
import ViewPdf from '../ViewPdf';
import Bookings from '../Bookings';
import BookingDetails from '../BookingDetails';
import ViewProfile from '../ViewProfile';
import Queries from '../queries/Index';
import Add from '../queries/Add';
import BookingTrip from '../BookingTrip';
import BookingRoundTrip from '../BookingRoundTrip';
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
                    {(userId && (user.role === 'agent')) && 
                       <li><Link to="/browse-bookings">Browse Booking</Link>
                    </li>
                    }
                    <li><Link to="/DriveWithUs">Drive With Us</Link>
                    </li>
                    <li><Link to="/HowitWorks">How it Works</Link>
                    </li>
                    <li><Link to="/CompanyInfo">Company Info</Link>
                    </li>                    
                    {(userId === false) && 
                      <li><a href="/login">Login</a></li>
                    }
                    {(userId === false) && 
                      <span>|</span>
                    }
                    {(userId === false) && 
                      <li ><a href="/register">Become a Vender</a></li>
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
      <Route exact path='/profile/:id' component={ViewProfile} />
      <Route exact path='/download-quote/:id' component={DownloadQuote} />
      <Route exact path='/customer-booking/:id' component={CustomerBookings} />
      <Route exact path='/quotations/:id' component={Qutations} />
      <Route exact path='/booked/:id' component={Booked} />
      <Route exact path='/cancelled/:id' component={Cancelled} />
      <Route exact path='/cancelled-booking/:id' component={CancelledBooking} />
      <Route exact path="/invoice-pdf/:id" component={InvoicePdf} /> 
      <Route exact path="/view-invoicepdf/:id" component={ViewPdf} /> 
      <Route exact path='/Bookings/:id' component={Bookings} />
      <Route exact path='/queries' component={Queries} />

      <Route exact path="/bookingtrip"><BookingTrip user_id={userId}/></Route>

      <Route exact path="/bookingroundtrip"><BookingRoundTrip user_id={userId}/></Route>

      <Route exact path="/query/add"><Add user_id={userId}/></Route>


      <Route exact path='/query/addgoogle' component={GoogleeAdd} />
  </Router>
  );
}

export default Header;
