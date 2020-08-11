import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Bookings extends Component {
  constructor(props){
    super(props);
    this.state={
      queries:[],
     activePage:1,
     itemsCountPerPage:1,
     totalItemsCount:1,
     pageRangeDisplayed:3
   }
   this.handlePageChange = this.handlePageChange.bind(this);
 }
 componentDidMount(){

   axios.get('/api/queries')
   .then(response=>{
    this.setState({
      queries:response.data.data,
      itemsCountPerPage:response.data.per_page,
      totalItemsCount:response.data.total,
      activePage:response.data.current_page
    })
  });

 }

 handlePageChange(pageNumber) {
  axios.get('/api/queries?page='+pageNumber)
  .then(response=>{
    this.setState({
      queries:response.data.data,
      itemsCountPerPage:response.data.per_page,
      totalItemsCount:response.data.total,
      activePage:response.data.current_page
    })
  });
}

onDelete(query_id){
  axios.delete('api/queries/delete/'+query_id)
  .then(response=>{
   var queries = this.state.queries;
   for(var i=0; i < queries.length; i++)
    if(queries[i].id == query_id)
    {
      queries.splice(i,1);
      this.setState({queries:queries});
    }
  });

}
 
render() {
  return (
       <div className="booking-page">
            <h1>Upcoming Booking</h1>
                  <table className="table table-bordered booking">
                     <thead class="thead-primary">
                        <tr>
                           <th scope="col">Booking Type</th>
                           <th scope="col">Start Date</th>
                           <th scope="col">End Date</th>
                           <th scope="col">Source</th>
                           <th scope="col">Destination</th>
                           <th scope="col">Persons</th>
                           <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.state.queries.map((query,i)=>{
                           return(
                           <tr key={i}>
                              <td>{query.booking_type}</td>
                              <td>{query.start_at}</td>
                              <td>{query.end_on}</td>
                              <td>{query.pick_up}</td>
                              <td>{query.destination}</td>
                              <td>{query.persons}</td>
                              <td><a href="/customer-booking" class="btn btn-default">View More</a></td>
                           </tr>
                           )
                        })
                     }
                  </tbody>
                  </table>
                  <div className="d-flex justify-content-center">
                     <Pagination
                     activePage={this.state.activePage}
                     itemsCountPerPage={this.state.itemsCountPerPage}
                     totalItemsCount={this.state.totalItemsCount}
                     pageRangeDisplayed={this.state.pageRangeDisplayed}
                     onChange={this.handlePageChange.bind(this)}
                     itemClass="page-item"
                     linkClass="page-link"
                     prevPageText="Prev"
                     nextPageText="Next"
                     lastPageText="Last"
                     firstPageText="First"
                     />
                  </div>
                  </div>
   );
}
}