import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
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
    <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft" />
    <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight" />
    <Router>
    <Routes/>
    <Sidebar/>
  <main className="body-content">
<Header/>
<Route exact path="/agent">
<Home/>
    </Route>
  </main>
    <RightSidebar/>
  <Footer/>
  </Router>
    </div>
    );
}
}
if ( document.getElementById('agent-app') ) {
    ReactDOM.render(<Index user_id={user_id}/>, document.getElementById('agent-app'));
}