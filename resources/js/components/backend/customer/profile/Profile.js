import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function Profile() {

  const [user, setUser] = useState(false);
  const [balance, setBalance] = useState(0);

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
      axios.get('/api/users/getbalance/'+AppState.user.id)
      .then(response=>{
        setBalance(response.data.balance);
      });
    }   

  },[]); 

  const handleClick = () => {  
    history.push('/customer/profile/edit')   
  };  

  return (
    <div className="information-page">
  {/* Page Heading */}
  <h3>Personal Information <a href="#">Edit</a></h3>
  <div className="informationform">
  <form>
  <div className="row">
  <div className="form-group col-sm-4">
  <input type="text" name="title" placeholder="Lorem" className="form-control" />
  </div>
  <div className="form-group col-sm-4">
  <input type="text" name="title" placeholder="Ipsum" className="form-control" />
  </div>
  </div>
  <div className="form-group">
  <label htmlFor="gender">Your Gender</label>
  <div className="row">
  <div className="form-check col-sm-2">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
  <label className="form-check-label" htmlFor="exampleRadios1">
  Male
  </label>
  </div>
  <div className="form-check col-sm-2">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
  <label className="form-check-label" htmlFor="exampleRadios2">
  Female
  </label>
  </div>
  </div>
  </div>
  <div className="emailaddress">
  <h3>Email Address <a href="#">Edit</a> <a href="#" className="change">Change Password</a></h3>
  <div className="row">
  <div className="form-group col-sm-4">
  <input type="text" name="title" placeholder="loremipsum@gmail.com" className="form-control" />
  </div>
  </div>
  </div>
  <div className="emailaddress">
  <h3>Mobile Number <a href="#">Edit</a></h3>
  <div className="row">
  <div className="form-group col-sm-4">
  <input type="text" name="title" placeholder="+91 9999999999" className="form-control" />
  </div>
  </div>
  </div>
  </form>
  </div>
  </div>

  );
}

export default Profile