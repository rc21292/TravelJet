import React, { useState, useEffect } from 'react'
import axios from 'axios';

const User = ({match}) => {

console.log(match.params.id);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
     axios
        .get('/api/users')
      .then(res => res.data.users)
      .then(json => {
        setUserData(json);
      });
  }, []);  

  const user = userData.find( user => user.id.toString() === match.params.id)
  const userDetail = user ? Object.entries(user) : 
    [['id', (<span> Not found</span>)]]

      return (
      <div className="container">      
        <table className="table table-striped table-hover">
          <tbody>
          {
            userDetail.map(([key, value], index) => {
              return (
              <tr key={index.toString()}>
                <td>{`${key}:`}</td>
                <td><strong>{value}</strong></td>
              </tr>
              )
            })
          }
          </tbody>
        </table>         
      </div>
      )
}

export default User
