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
        <div className="ms-content-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="ms-panel ms-panel-fh">
              <div className="ms-panel-body">
                <ul className="ms-profile-stats">
                  <li>
                    <img className="img-fluid ms-profile-img" src="http://94.242.206.59/uploads/20717.png" alt="people" />
                  </li>
                </ul>
                <h2 className="section-title">Basic Information</h2>
                <table className="table table-bordered ms-profile-information">
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Role</th>
                      <td>{user.role}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email Address</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phone Number</th>
                      <td>{user.phone}</td>
                    </tr>
                     <tr>
                      <th scope="row">Wallet Balance</th>
                      <td>Rs. {balance}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="edit-form text-right">
                  <a onClick={handleClick} className="btn btn-primary">Edit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile