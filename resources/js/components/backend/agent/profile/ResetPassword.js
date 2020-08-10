import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function ResetPassword() {

  const [user, setUser] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
    }   

  },[]); 

  const handleClick = () => {  
    history.push('/customer/profile/edit')   
  };  

  return (

    <div className="information-page">
      <h3>Personal Information </h3>
      <div className="informationform">
        <form>
          <div className="row">
            <div className="form-group col-sm-4">
              <input type="text" name="name" value={name} placeholder="Enter Full Name" className="form-control" readOnly = {readonlyName}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Your Gender</label>
            <div className="row">
              <div className="form-check col-sm-2">
                <input className="form-check-input" type="radio" name="gender" id="gender1" checked={ gender === "Male"}  />
                <label className="form-check-label" htmlFor="gender1">
                  Male
                </label>
              </div>
              <div className="form-check col-sm-2">
                <input className="form-check-input" type="radio" name="gender" id="gender2" checked={ gender === "Female"} />
                <label className="form-check-label" htmlFor="gender2">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="emailaddress">
            <h3>Email Address </h3>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="text" name="email" value={email} readOnly={readonlyEmail} placeholder="Enter Email" className="form-control" />
              </div>
            </div>
          </div>
          <div className="phone">
            <h3>Mobile Number</h3>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="text" name="phone" value={phone} readOnly={readonlyPhone} placeholder="Enter Phone" className="form-control" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword