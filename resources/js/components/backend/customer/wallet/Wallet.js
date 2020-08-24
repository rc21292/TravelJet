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
                    <div className="transaction">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">TRANSACTION</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">COMMENT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span className="date">JUNE 2020</span><br />
                              <span className="paidloca">Paid for Goa Booking</span><br />
                              <span className="datetime">29 JUN, 11:39 AM</span><br />
                              <span className="bookid">Booking ID:000000</span><br />
                              <span className="bookid">Transaction ID:000000</span>
                            </td>
                            <td>
                              <span className="paidprice">
                                -<i className="fa fa-rupee" /> 1999
                              </span>
                            </td>
                            <td>SUCCESS</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="date">APRIL 2020</span><br />
                              <span className="paidloca">Paid for Manali Booking</span><br />
                              <span className="datetime">14 APR, 11:39 AM</span><br />
                              <span className="bookid">Booking ID:000000</span><br />
                              <span className="bookid">Transaction ID:000000</span>
                            </td>
                            <td>
                              <span className="paidprice">
                                -<i className="fa fa-rupee" /> 1999
                              </span>
                            </td>
                            <td>SUCCESS</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="date">MARCH 2020</span><br />
                              <span className="paidloca">Paid for Shimla Booking</span><br />
                              <span className="datetime">16 MAR, 11:39 AM</span><br />
                              <span className="bookid">Booking ID:000000</span><br />
                              <span className="bookid">Transaction ID:000000</span>
                            </td>
                            <td>
                              <span className="paidprice">
                                -<i className="fa fa-rupee" /> 1999
                              </span>
                            </td>
                            <td>SUCCESS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


		);
	}
}