import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Payouts from './payouts/Payouts'
import Notifications from './notifications/Notifications'
import Credits from './credits/Credits'
import Agents from './agents/Agents'
import Customers from './customers/Customers'
import Commissions from './commissions/Commissions'
import UserProfiles from './userprofiles/UserProfiles'
import PendingPayouts from './payouts/PendingPayouts'
import PaymentDetail from './payouts/PaymentDetail'
import CustomerDetails from './customers/CustomerDetails'
import AgentDetails from './agents/AgentDetails'
import InformationPages from './informationpages/InformationPages'
import TransactionHistory from './transactions/TransactionHistory'
import Footer from './layouts/Footer'
import Sidebar from './layouts/Sidebar'
import RightSidebar from './layouts/RightSidebar'
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
        <div id="preloader-wrap">
        <div className="spinner spinner-8">
        <div className="ms-circle1 ms-child" />
        <div className="ms-circle2 ms-child" />
        <div className="ms-circle3 ms-child" />
        <div className="ms-circle4 ms-child" />
        <div className="ms-circle5 ms-child" />
        <div className="ms-circle6 ms-child" />
        <div className="ms-circle7 ms-child" />
        <div className="ms-circle8 ms-child" />
        <div className="ms-circle9 ms-child" />
        <div className="ms-circle10 ms-child" />
        <div className="ms-circle11 ms-child" />
        <div className="ms-circle12 ms-child" />
        </div>
        </div>
    {/* Overlays */}
    <Router>
    <Routes/>


<Header/>
<div id="wrapper">
    <Sidebar/>
<Switch>
        <Route exact path="/admin">
        <Home user_id={user_id}/>
        </Route>

        <Route exact path="/admin/payouts">
        <Payouts/>
        </Route>

        <Route exact path="/admin/notifications">
        <Notifications/>
        </Route>

        <Route exact path="/admin/credits">
        <Credits/>
        </Route>

        <Route exact path="/admin/agents">
        <Agents/>
        </Route>

        <Route exact path="/admin/customers">
        <Customers/>
        </Route>

        <Route exact path="/admin/commissions">
        <Commissions/>
        </Route>

        <Route exact path="/admin/userprofiles">
        <UserProfiles/>
        </Route>

        <Route exact path="/admin/pending-payouts">
        <PendingPayouts/>
        </Route>

        <Route exact path="/admin/payment-detail/:id">
        <PaymentDetail/>
        </Route>

        <Route exact path="/admin/customer/:id">
        <CustomerDetails/>
        </Route>

        <Route exact path="/admin/agent/:id">
        <AgentDetails/>
        </Route>

        <Route exact path="/admin/informationpages">
        <InformationPages/>
        </Route>

        <Route exact path="/admin/transaction-history">
        <TransactionHistory/>
        </Route>

        </Switch>
<Footer/>
  </div>
  </Router>
    </div>
    );
}
}

if ( document.getElementById('admin-app') ) {
    ReactDOM.render(<Index user_id={user_id}/>, document.getElementById('admin-app'));
}