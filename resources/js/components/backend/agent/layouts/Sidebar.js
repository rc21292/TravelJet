import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Sidebar(props) {

  const [user, setUser] = useState(false);
  const [countNotice, setCountNotice] = useState(0);
  const [userId, setUserId] = useState(props.user_id);

  const [profileData, setProfileData] = useState({});

  useEffect(() => {

    axios.get("/api/users/show/"+userId).then(response => {
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
        setUser(appState.user);
        localStorage["appState"] = JSON.stringify(appState);
      }
    });

    axios('/api/users/getAgentProfileByUserId/'+userId).then(result=>{
      if (result.data.profile) {
        setProfileData(result.data);
      }else{
        setProfileData({...profileData,profile:''});
      }
      });

    axios.get('/api/countNotificationsByAgentId/'+userId)
    .then(result=>{
      setCountNotice(result.data)
    });

  },[]);

  return (
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
{/* Sidebar - Brand */}
<a style={{paddingLeft:'20px', marginBottom:'7px'}} className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
<div className="sidebar-brand-icon">
{profileData.profile ? <img style={{height:'70px'}} src={'/uploads/users/'+user.id+'/profile/medium-'+profileData.profile}></img> : <img src="/frontend/image/icons/user.png" alt="user" /> }
</div>
<div className="sidebar-brand-text mx-3">{user.name}</div>
</a>
{/* Divider */}
<hr className="sidebar-divider my-0" />
{/* Nav Item - Pages Collapse Menu */}

<li className="nav-item active">
	<a className="nav-link" href="/agent">
  	<span>Dashboard</span></a>
</li>
{/* Nav Item - Utilities Collapse Menu */}
<li className="nav-item">
<a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
<span>Account Setting</span>
</a>
<div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
<div className="bg-white py-2 collapse-inner rounded">
<a className="collapse-item" href="/agent/personal-information">Profile Information</a>
<a className="collapse-item" href="/agent/portfolio">Portfolio</a>
</div>
</div>
</li>
<li className="nav-item">
<a className="nav-link active" href="/agent/leads">
<span>My Leads</span></a>
</li>

<li className="nav-item">
<a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities1" aria-expanded="true" aria-controls="collapseUtilities1">
<span>Vehicles</span>
</a>
<div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
<div className="bg-white py-2 collapse-inner rounded">
<a className="collapse-item" href="/agent/vehicles">Vehicles</a>
<a className="collapse-item" href="/agent/drivers">Drivers</a>
</div>
</div>
</li>


<li className="nav-item">
<a className="nav-link" href="/agent/transactions">
<span>Transaction History</span></a>
</li>

{/* Nav Item - Charts */}
<li className="nav-item">
<a className="nav-link" href="/agent/wallet">
<span>My Wallet</span></a>
</li>
{/* Nav Item - Tables */}


<li className="nav-item">
        <a className="nav-link" href="/agent/payouts">
          <span>Payout</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/agent/credits">
          <span>Credits</span></a>
      </li>

<li className="nav-item">
<a className="nav-link" href="/chatify">
<span>Inbox</span></a>
</li>
<li className="nav-item">
<a className="nav-link" href="/agent/notifications">
<span>Notification <span style={{ float: 'right'}} id="badge-counter2">{countNotice}</span> </span></a>
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