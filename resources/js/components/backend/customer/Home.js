import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



function Home() {

	const [user, setUser] = useState(false);
	const [balance, setBalance] = useState(0);
	 const [noticeData, setNoticeData] = useState([]);  
	 const [bookingData, setBookingData] = useState([]);  

	useEffect(() => {


		let stateqq = localStorage["appState"];
		// console.log(stateqq);
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
			axios.get('/api/notifications/'+AppState.user.id)
		  		.then(result=>{
		  			setNoticeData(result.data);
	  		});
		  	axios.get('/api/queries')
		  		.then(result=>{
		  			setBookingData(result.data.data);
	  		});
		}   

	},[]); 

	return (
		<div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Customer Dashboard</h1>
          </div>
		);
	}

	export default Home;