import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Wallet extends Component {

  constructor(props) {

    super(props)
    this.state = {
      balance: 0
    }
  }


    componentDidMount()
    {
      let logstate = localStorage["appState"];
      if (logstate) {
        let AppState = JSON.parse(logstate);
        axios.get('/api/users/getbalance/'+AppState.user.id)
        .then(response=>{
          this.setState({
            balance:response.data.balance
          })
        });
      }  
    }

	render() {
		return (
          <div className="wallet-page">
            {/* Page Heading */}
            <h1>My Wallet</h1>
            <div className="customerwallet">
              <div className="row">
                <div className="col-sm-12">
                  <div className="total">
                    Total Balance
                  </div>
                  <div className="price">
                    <i className="fa fa-rupee" /> {this.state.balance}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h4>Recently Transaction</h4>
                  <table className="table table-bordered leadstatus">
                    <thead className="thead-secondary">
                      <tr>
                        <th scope="col" className="bd">Date</th>
                        <th scope="col">Transaction Type</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                      <tr>
                        <td>14-Jul-20</td>
                        <td>Deposit</td>
                        <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                        <td><i className="fa fa-inr" /> 5000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="clearfix" />
                <div className="col-sm-12">
                  <div className="alltransactions">
                    <a href="/ahent/transactions" className="btn btn-primary">View All Transactions</a>
                  </div>
                </div>
              </div>
            </div>
          </div>


		);
	}
}