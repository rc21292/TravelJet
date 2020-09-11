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
      });
    }

  },[])

  const [bookings, setBookings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [inputFields, setInputFields] = useState([{stopege:''}]);
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
        stopeges: inputFields
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
      setInputFields([...inputFields, { stopege:''}]);
    }
  };


  const handleRemoveFields = (index, event) => {
    event.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

  };

		return (
            <div className="edittrip">
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">

                    <div className="add-stop">
                      <div className="addstop-title" onClick={() => handleAddFields()}>
                        <i className="fa fa-plus-circle" /> <span>Add Stop</span>
                      </div>
                      {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                          { 
                          index > 0 ?
                          <div className="col-sm-6">
                            <div className="radio custom-radio" style={{position: 'relative'}}>
                              <label htmlFor="stopage">Stopage {index}</label>
                              <input
                              onChange={event => handleInputChange(index, event)}
                              type="text"
                              className="route-stop form-control"
                              name="stopage"
                              value={inputField.stopage}
                              />
                              <button onClick={event => handleRemoveFields(index, event)} id="remove1" className="btn btn-danger remove-me" style={{position: 'absolute',top: '21px', right:'1px'}}><i className="fa fa-minus-circle" /></button>
                            </div>
                          </div>
                          :null
                          }
                        </Fragment>
                        ))}
                      </div>
                  </div>
                </div>
              </div>
              <div className="savebtn" style={{ marginTop:'20px' }}>
                <div className="form-group"> <a onClick={saveBooking} className="btn btn-primary">Save</a>
                </div>
              </div>
            </div>
		);
	
}
export default EditStoppages