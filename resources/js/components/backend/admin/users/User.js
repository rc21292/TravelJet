import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Moment from 'moment';

const User = ({match}) => {

console.log(match.params.id);
  const [userData, setUserData] = useState({});

  useEffect(() => {
     axios
        .get('/api/users/show/'+match.params.id)
      .then(result => {
        setUserData(result.data);
      });
  }, []);  

      return (
      <div className="ms-panel">
                <div className="ms-panel-header  ms-panel-custom">
                   <div className="col-sm-12">
                      <h6>User Detail</h6>
                   </div>
                </div>
                <div className="ms-panel-body">
             <table className="table table-hover table-striped">
      <tbody>
                            <tr><th scope="row">ID : </th><td>{userData.id}</td></tr>
                            <tr><th scope="row">Name : </th><td>{userData.name}</td></tr>
                            <tr><th scope="row">Role Name : </th><td>{userData.role}</td></tr>
                            <tr><th scope="row">Email : </th><td>{userData.email}</td></tr>
                            <tr><th scope="row">Phone : </th><td>{userData.phone}</td></tr>
                            <tr><th scope="row">Created At : </th><td>{Moment(userData.created_at).format('DD-MM-YYYY')}</td></tr>
                           
                        </tbody>
        </table>         
      </div>
      </div>
      )
}

export default User
