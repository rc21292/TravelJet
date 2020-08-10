import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';


import Pagination from "react-js-pagination";

export default class Listing extends Component {
	constructor(){
		super();
		this.state={
       activePage:1,
     itemsCountPerPage:1,
     totalItemsCount:1,
     pageRangeDisplayed:3,
			users:[]
		}
        this.handlePageChange = this.handlePageChange.bind(this);
	}


    handlePageChange(pageNumber) {
      axios.get('/api/users?page='+pageNumber)
      .then(response=>{
        this.setState({
          users:response.data.users.data,
          itemsCountPerPage:response.data.users.per_page,
          totalItemsCount:response.data.users.total,
          activePage:response.data.users.current_page
        })
      });
    }


    receivedData() {
        axios
        .get('/api/users')
        .then(response => {
         const data_user = response.data.users;
         this.setState({users:data_user.data,
           itemsCountPerPage:data_user.per_page,
           totalItemsCount:data_user.total,
           activePage:data_user.current_page
         })
       });
    }


    onDelete(user_id){
      axios.delete('api/users/delete/'+user_id)
      .then(response=>{
           var users = this.state.users;
           for(var i=0; i < users.length; i++)
            if(users[i].id == user_id)
            {
              users.splice(i,1);
              this.setState({users:users});
            }
      });

    }



    componentDidMount(){

        this.receivedData();
        
    }


	render() {
		return (
         <div className="container">         
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Created At</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {this.state.users.map((user,i)=>{
  	return(
      <tr key={i}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.role_name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.created}</td>
        <td><a href="#" onClick={this.onDelete.bind(this,user.id)}>Delete</a></td>
        <td><Link to={'/user/'+user.id}>View</Link></td>
        
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
 firstPageText="First"/>
 </div>
 </div>       

		);
	}
}