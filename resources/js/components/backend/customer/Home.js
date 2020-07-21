import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



function Home() {

	const [user, setUser] = useState(false);
	const [balance, setBalance] = useState(0);
	 const [noticeData, setNoticeData] = useState([]);  

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
			axios.get('/api/notifications/'+AppState.user.id)
		  		.then(result=>{
		  			setNoticeData(result.data);
	  		});
		}   

	},[]); 

	return (
		<div className="ms-content-wrapper">
		   <div className="row">
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-success ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Total Orders</h6>
		                  <p className="ms-card-change"> <i className="material-icons">arrow_upward</i> 4567</p>
		                  <p className="fs-12">48% From Last 24 Hours</p>
		               </div>
		            </div>
		            <i className="flaticon-archive" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Compeleted Orders</h6>
		                  <p className="ms-card-change"> $80,950</p>
		                  <p className="fs-12">2% Decreased from last day</p>
		               </div>
		            </div>
		            <i className="flaticon-supermarket" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-warning ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Pending Orders</h6>
		                  <p className="ms-card-change"> <i className="material-icons">arrow_upward</i> 4567</p>
		                  <p className="fs-12">48% From Last 24 Hours</p>
		               </div>
		            </div>
		            <i className="flaticon-reuse" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-info ms-widget ms-infographics-widget">
		            <div className="ms-card-body pos media">
		               <div className="media-body">
		                  <h6>Total Products</h6>
		                  <p className="ms-card-change"> $80,950</p>
		                  <p className="fs-12">2% Decreased from last week</p>
		               </div>
		            </div>
		            <i className="fas fa-cannabis" />
		         </div>
		      </div>
		      <div className="col-xl-8 col-md-12">
		         <div className="ms-panel">
		            <div className="ms-panel-header  ms-panel-custom">
		               <div className="col-sm-6">
		                  <h6>Recent Projects</h6>
		               </div>
		               <div className="col-sm-6">
		                  <div style={{ float:'right'}}>
		                     <button type="button" className="btn btn-gradient-info">More</button>
		                  </div>
		               </div>
		            </div>
		            <div className="ms-panel-body">
		               <Bookings/>
		            </div>
		         </div>
		      </div>
		      <div className="col-xl-4 col-md-12">
		         <div className="col-xl-12 col-md-12">
		            <a href="#">
		               <div className="ms-panel ms-panel-hoverable has-border ms-widget ms-has-new-msg ms-notification-widget">
		                  <div className="ms-panel-body media">
		                     <div className="media-body">
		                        <h6>Welcome back</h6>
		                        <hr/>
		                        <p>{user.name} ( {user.role} )</p>
		                        <p>{user.email}</p>
		                     </div>
		                  </div>
		               </div>
		            </a>
		         </div>
		         <div className="col-xl-12 col-md-12">
		            <a href="#">
		               <div className="ms-panel ms-panel-hoverable has-border ms-widget ms-has-new-msg ms-notification-widget">
		                  <div className="ms-panel-body media">
		                     <div className="media-body">
		                        <h6>Account balance</h6>
		                        <hr/>
		                        <span>Rs. {balance}</span>
		                        <p>
		                           <Link className="btn btn-pill btn-gradient-info" to={'/customer/wallet'}>
		                           Deposit Fund</Link>
		                        </p>
		                     </div>
		                  </div>
		               </div>
		            </a>
		         </div>
		      </div>
		      <div className="col-xl-8 col-md-12">
	            <div className="ms-panel">
	              <div className="ms-panel-header  ms-panel-custom">
	                <div className="ms-heading">
	                  <h6>News Feed</h6>
	                </div>
	              </div>
	              <div className="ms-panel-body">
	                <div className="table-responsive">
	                  <table className="table table-hover table-striped thead-primary">
	                    <tbody>
	                      {  
	                        noticeData.map((query, idx) => {  
	                        return  <tr key={idx}>
	                          <td className="ms-table-f-w"> <img src="http://worksheriff.com/images/icons/app.svg" alt="people" />
	                            <span dangerouslySetInnerHTML={{__html: query.data}} ></span>
	                            <div style={{ marginLeft : '50px' }}><b>{query.created_at}</b>
	                            </div>
	                          </td>
	                        </tr>  
	                      })}  
	                    </tbody>
	                  </table>
	                   <hr/>
	                  <center>
	                     <Link to="/customer/notifications" className="btn btn-pill btn-gradient-info">View All</Link>
	                  </center>
	                </div>
	              </div>
	            </div>
	          </div>
		   </div>
		</div>
		);
	}

	export default Home;