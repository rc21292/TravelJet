import React from 'react'  
import axios from 'axios';  


function Payouts() { 


  return (  
     <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-12">
                  <h1>Payout</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="informationform">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="labelname">Filter by From Date</label>
                        <input type="date" name="date" className="form-control" defaultValue="date" /> 
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="labelname">Filter by To Date</label>
                        <input type="date" name="date" className="form-control" defaultValue="date" />
                      </div>    
                    </div>
                  </div>
                </div>  
                <div className="col-sm-4">
                  <div className="transaction-show payout">
                    <ul className="list-inline">
                      <li><a href="#" className="btn btn-primary">Filter</a></li>
                      <li><a href="#" className="btn btn-light">Export</a></li>
                      <li><a href="#" className="btn btn-primary">Reset</a></li>
                    </ul>
                  </div>
                </div>  
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <br />
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table leadstatus">
                          <thead className="thead-secondary">
                            <tr>
                              <th scope="col" className="bd">Agent Name</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Payment Method</th>
                              <th scope="col">Processing Date</th>
                              <th scope="col">Transaction Id</th>
                              <th scope="col">Processing Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td>Rahul Kumar</td>
                              <td><i className="fa fa-inr" /> 6000</td>
                              <td>Bank Transfer</td>
                              <td>30-07-2020</td>
                              <td>00000000000</td>
                              <td>Complete</td>
                            </tr>
                            <tr>
                              <td colSpan={6}>
                                <div className="col-sm-6">
                                  <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                      <li className="page-item">
                                        <a href="#" aria-label="Previous">
                                          <i className="fa fa-angle-left" />
                                        </a>
                                      </li>
                                      <li className="active"><a className="page-link" href="#">1</a></li>
                                      <li><a className="page-link" href="#">2</a></li>
                                      <li>
                                        <a href="#" aria-label="Next">
                                          <i className="fa fa-angle-right" />
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                                <div className="col-sm-6">
                                  <div className="showpage">Showing 1 to 13 of 20 (2 Pages)</div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
  )  
}  
  
export default Payouts