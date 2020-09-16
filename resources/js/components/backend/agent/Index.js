import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Bookings from './bookings/Bookings'
import Drivers from './vehicles/Drivers'
import Vehicles from './vehicles/Vehicles'
import CreateInvoice from './invoices/CreateInvoice'
import Invoice from './invoices/Invoice'
import Quotations from './quotations/Quotations'
import TransactionHistory from './transactions/TransactionHistory'
import Notifications from './notifications/Notifications'
import BrowseBookings from './browsebookings/BrowseBookings'
import Leads from './leads/Leads'
import Address from './address/Address'
import Profile from './profile/Profile'
import Portfolio from './profile/Portfolio'
import EditProfile from './profile/EditProfile'
import ChangePassword from './profile/ChangePassword'
import Wallet from './wallet/Wallet'
import Payouts from './payouts/Payouts'
import Credits from './credits/Credits'
import Invoices from './invoices/Invoices'
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
                  <Header user_id={user_id}/> 
                  <div className="container">
                        <div id="wrapper">
                              <Sidebar/>
                              <div id="content-wrapper">
                                    <div id="content">
                                          <div className="container-fluid">
                                                <Router>
                                                      <Switch>
                                                            <Route exact path="/agent">
                                                                  <Home user_id={user_id}/>
                                                            </Route>
                                                            <Route path="/agent/bookings">
                                                                  <Bookings/>
                                                            </Route>
                                                            <Route path="/agent/vehicles">
                                                                  <Vehicles/>
                                                            </Route>
                                                            <Route path="/agent/drivers">
                                                                  <Drivers/>
                                                            </Route>
                                                            <Route path="/agent/quotations">
                                                                  <Quotations/>
                                                            </Route>
                                                            <Route path="/agent/create-invoice/:id">
                                                                  <CreateInvoice/>
                                                            </Route> 
                                                            <Route path="/agent/invoice/:id">
                                                                  <Invoice/>
                                                            </Route> 
                                                            <Route path="/agent/wallet">
                                                                  <Wallet/>
                                                            </Route>
                                                            <Route path="/agent/payouts">
                                                                  <Payouts/>
                                                            </Route>
                                                            <Route path="/agent/credits">
                                                                  <Credits/>
                                                            </Route>
                                                            <Route path="/agent/invoices">
                                                                  <Invoices/>
                                                            </Route>
                                                            <Route path="/agent/leads">
                                                                  <Leads/>
                                                            </Route>
                                                            <Route path="/agent/manage-address">
                                                                  <Address/>
                                                            </Route>
                                                            <Route exact path="/agent/personal-information">
                                                                  <Profile/>
                                                            </Route>
                                                            <Route exact path="/agent/portfolio">
                                                                  <Portfolio/>
                                                            </Route>
                                                            <Route exact path="/agent/personal-information/edit">
                                                                  <EditProfile/>
                                                            </Route>
                                                            <Route path="/agent/change-password">
                                                                  <ChangePassword/>
                                                            </Route>
                                                            <Route path="/agent/transactions">
                                                                  <TransactionHistory/>
                                                            </Route>
                                                            <Route path="/agent/inbox">
                                                                  <Inbox/>
                                                            </Route>

                                                            <Route path="/agent/notifications">
                                                                  <Notifications/>
                                                            </Route>

                                                            <Route path="/agent/browse-bookings">
                                                                  <BrowseBookings/>
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

if ( document.getElementById('agent-app') ) {
    ReactDOM.render(<Index user_id={user_id} />, document.getElementById('agent-app'));
}
