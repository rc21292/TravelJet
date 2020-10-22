import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Bookings from './bookings/Bookings'
import CancelledBookings from './bookings/CancelledBookings'
import Quotations from './quotations/Quotations'
import Invoices from './invoices/Invoices'
import Address from './address/Address'
import Profile from './profile/Profile'
import Reviews from './Reviews/Reviews'
import Review from './Reviews/Review'
import ProfileAgent from './quotations/ProfileAgent'
import Notifications from './notifications/Notifications'
import ChangePassword from './profile/ChangePassword'
import Wallet from './wallet/Wallet'
import Inbox from './inbox/Inbox'
import Footer from './layouts/Footer'
import Sidebar from './layouts/Sidebar'
import Home from './Home'
import Routes from './Routes'

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id : props.user_id
        }
    }


    componentDidMount(){

        axios.get("/api/users/show/"+this.state.user_id).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    gender: json.data.gender,
                    email: json.data.email,
                    phone: json.data.phone,
                    role: json.data.role,
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
            }
        })
    }


    render() {
        return (
            <div>
                  <Topbar/>
                  <Header user_id={user_id} /> 
                  <div className="container">
                        <div id="wrapper">
                              <Sidebar/>
                              <div id="content-wrapper">
                                    <div id="content">
                                          <div className="container-fluid">
                                                <Router>
                                                      <Switch>
                                                            <Route exact path="/customer">
                                                                  <Home user_id={user_id}/>
                                                            </Route>
                                                            <Route path="/customer/bookings">
                                                                  <Bookings/>
                                                            </Route>
                                                             <Route path="/customer/cancelled-bookings">
                                                                  <CancelledBookings/>
                                                            </Route>
                                                            <Route path="/customer/quotations">
                                                                  <Quotations/>
                                                            </Route>
                                                             <Route path="/customer/invoices">
                                                                  <Invoices/>
                                                            </Route> 
                                                            <Route path="/customer/manage-address">
                                                                  <Address/>
                                                            </Route>
                                                            <Route path="/customer/personal-information">
                                                                  <Profile/>
                                                            </Route>
                                                            <Route path="/customer/reviews">
                                                                  <Reviews/>
                                                            </Route>
                                                            <Route path="/customer/review/:id">
                                                                  <Review/>
                                                            </Route>
                                                            <Route path="/customer/profile/:id">
                                                                  <ProfileAgent/>
                                                            </Route> 
                                                            <Route path="/profile/:id">
                                                                  <ProfileAgent/>
                                                            </Route> 
                                                            <Route path="/customer/change-password">
                                                                  <ChangePassword/>
                                                            </Route>
                                                            <Route path="/customer/wallet">
                                                                  <Wallet/>
                                                            </Route>
                                                            <Route path="/customer/inbox">
                                                                  <Inbox/>
                                                            </Route>
                                                            <Route path="/customer/notifications">
                                                                  <Notifications/>
                                                            </Route>
                                                            
                                                      </Switch>
                                                </Router>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>            
                  <Footer/>
            </div>
            );
    }
}

if ( document.getElementById('customer-app') ) {
    ReactDOM.render(<Index user_id={user_id} />, document.getElementById('customer-app'));
}