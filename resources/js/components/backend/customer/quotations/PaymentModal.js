import React, { Component, useState,useRef, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';

const EditStoppages = (props) => {

  const history = useHistory();


  useEffect(()=>{ 

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/show/'+props.id).then(result=>{
        setBookings(result.data);
      });
      axios.get('/api/queries/getStoppages/'+props.id).then(result=>{
        setInputFields(result.data);
        console.log(result.data);
      });
    }

  },[])

  const [bookings, setBookings] = useState({});
  const [submitted, setSubmitted] = useState(false);
   const [inputFields, setInputFields] = useState([]);

  const [user, setUser] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [success, setSuccess] = useState({});
  const [isErrors, setIsErrors] = useState(0);


  const saveBooking = (event) => {

    event.preventDefault();
      var data = {
        id:bookings.id,
        user_id: bookings.user_id,
        stopeges: bookings.stopeges
      };

    axios({
      method: 'post',
      url: '/api/queries/updateStoppages/'+bookings.id,
      data: data,
    })
    .then(response => {
       props.onIdChnage(0);     
      setSubmitted(true);   
    })
    .catch(e => {
      console.log(e);
    });
  };

    const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "stopage") {
      values[index].stopage = event.target.value;
    }
    setInputFields(values);
    setBookings({ ...bookings, stopeges: values });
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    if(values.length < 5){
      values.push({ stopage: '' });
      setInputFields(values);
    }
  };

  const handleRemoveFields = (index, event) => {
    event.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

  };

		return (
            <div className="modal fade" id="myModal2" role="dialog">
              <div className="modal-dialog">
                {/* Modal content*/}
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="paynow">
                          <h3>Booking Title</h3>
                          <span>Booking ID:0000000</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="headerbudget">
                          <span>Total Cost</span> 
                          <div className="budgetprice">
                            <i className="fa fa-inr" /> 6900
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" defaultValue="option1" />
                          <label className="form-check-label" htmlFor="inlineCheckbox1">I am using my wallet</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="walletprice">
                          <img src="image/icons/wallet.png" /> <span> Balance:</span> <i className="fa fa-inr" /> 2500
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="paybtn text-center">
                          <span> Pay partial amount of this trip:</span> <b><i className="fa fa-inr" /> 3000</b> <a href="#" className="btn btn-primary">Pay Now</a>
                        </div>
                        <div className="col-sm-12">
                          <p><b>Note:</b> Please pay the 100% Amount before your booking date.</p>
                          <div className="payiconimg text-center">
                            <p>We are Accept</p>
                            <img src="image/icons/payiconimg.png" alt="pay icon" className="img-responsive" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
		);
	
}
export default EditStoppages