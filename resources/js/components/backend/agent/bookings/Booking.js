import React from 'react'  
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'  
function Booking({match}) { 

  const history = useHistory()

  const [bookingData, setBookingData] = useState({});  
  
   useEffect(() => {  
    const GetData = async () => {  
      const result = await axios('/api/queries/show/'+match.params.id);  
      setBookingData(result.data);  
    };  
  
    GetData();  
  }, []); 

console.log(bookingData);

  const deleteBooking = (id) => {  
    axios.delete('api/queries/delete/'+ id)  
      .tden((result) => {  
        history.push('/Booking')  
      });  
  };  
  const viewBooking = (id) => {  
    history.push({  
      pathname: '/booking/' + id  
    });  
  };  

return (  
    <div className="container animated fadeIn">  
      <Row>  
        <Col>  
          <Card>  
            <CardHeader>  
              <i className="fa fa-align-justify"></i> Employee List  
              </CardHeader>  
            <CardBody>  
              <Table hover bordered striped responsive size="sm">  
                <thead>  
                  <tr>  
                  <th scope="col">#</th>
                  <th scope="col">Booking Type</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Pick Up</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Sight Seeing</th>
                  <th scope="col">Cab Type</th>
                  <th scope="col">Persons</th>
                  </tr>  
                </thead>  
                <tbody>  
                  <tr kay="{bookingData.id">
                       <td scope="row">1</td>
                       <td>{bookingData.booking_type}</td>
                       <td>{bookingData.start_at}</td>
                       <td>{bookingData.end_on}</td>
                       <td>{bookingData.pick_up}</td>
                       <td>{bookingData.destination}</td>
                       <td>{bookingData.sightseeing}</td>
                       <td>{bookingData.cab_type}</td>
                       <td>{bookingData.persons}</td>  
                      </tr> 
                </tbody>  
              </Table>  
            </CardBody>  
          </Card>  
        </Col>  
      </Row>  
    </div>  
  )  
}  
  
export default Booking