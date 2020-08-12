import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect, Fragment } from 'react'  

function Qutations({match}) { 

  const history = useHistory()
  const location = useLocation()


  const initialQuotationState = {
    booking_id: match.params.id,
    user_id: null,
    payment: 0,
    total_payment: 0,
    payment_first: 0,
    payment_second: 0,
    payments: null
  };

  const [quotations, setQuotations] = useState(initialQuotationState);
  const [bookingData, setBookingData] = useState({});  
  const [stopeges, setStopages] = useState(false);  
  const [submitted, setSubmitted] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({});
  const [isErrors, setIsErrors] = useState(0);
   const [user, setUser] = useState(false);
    const [inputFields, setInputFields] = useState([{payment:''}]);
 
  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setQuotations({ ...quotations, user_id: AppState.user.id });

      axios.get('/api/quotations/getQuotation/'+AppState.user.id)
      .then(response=>{
        console.log(response.data.total_payment);
        if (response.data) {
          setQuotations({ ...quotations, user_id: AppState.user.id,payment:response.data.payment,total_payment: response.data.total_payment,payment_first:response.data.payment_first,payment_second:response.data.payment_second })
        }else{
        }
      }); 

      axios.get('/api/quotations/getQuotationPayment/'+AppState.user.id)
      .then(response=>{
        if (response.data) {
          setInputFields(response.data);
        }else{
        setInputFields([{ payment: ''}]);
        }
      }); 


      const GetData = async () => {  
      const result = await axios('/api/queries/show/'+match.params.id);  
      setBookingData(result.data);  

       const result1 = await axios('/api/queries/getStopages/'+match.params.id);  
      setStopages(result1.data.stopages);  
    };  
  
    GetData();  

    }   
  }, []);  


const myFunction = () =>  {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
 /*   filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }*/
}

const handleInputChanges = event => {
    const { name, value } = event.target;
     if (name === "payment") {
      const total_paymentt = parseInt(value) + ((value * 15)/100);
      console.log(total_paymentt);
    // setQuotations({ ...quotations, payments: total_paymentt });
    setQuotations({ ...quotations, payment:value,total_payment: total_paymentt });
  }else{

    setQuotations({ ...quotations, [name]: value });
  }
  };


const saveBid = () => {
    var data = quotations;
    axios({
      method: 'post',
      url: '/api/quotations/storeBid',
      data: data,
    })
    .then(response => {
      setSubmitted(true);
      //window.location = '/customer/bookings';     
    })
    .catch(e => {
      console.log(e);
    });
  };

const handleInputChange = (index, event) => {
  const values = [...inputFields];
  if (event.target.name === "payment") {
    values[index][event.target.name] = event.target.value;
  }
  setInputFields(values);
  setQuotations({ ...quotations, payments: values });
};

const handleAddFields = () => {
  const values = [...inputFields];
  if(values.length < 5){
    setInputFields([...inputFields, { payment:''}]);
  }
};

const handleRemoveFields = (index, event) => {
  alert(index);
  event.preventDefault();
  const values = [...inputFields];
  console.log(values);
  values.splice(index, 1);
  setInputFields(values);
  setQuotations({ ...quotations, payments: values });

};


  return (  
          <div className="bookingvenderlist">
        <main id="wt-main" className="wt-main wt-haslayout wt-innerbgcolor">
          <div className="wt-main-section wt-haslayout">
            {/* User Listing Start*/}
            <div className="wt-haslayout">
              <div className="container">
                <div className="row">
                  <div id="wt-twocolumns" className="wt-twocolumns wt-haslayout">
                    <div className="vendersearchtrip">
                      <div className="col-sm-3 float-left">
                        <aside id="wt-sidebar" className="wt-sidebar wt-usersidebar viewbookingleft">
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>About the Customer</h2>
                            </div>
                            <div className="customerabout">
                              <ul className="list-unstyled">
                                <li><span><i className="fa fa-user" />Name : Ranjeet Singh</span></li>
                                <li><span><i className="fa fa-phone" />Contact Number : +91 9971717045</span></li>
                                <li><span><i className="fa fa-envelope" />Email : avisheksubi@gmail.com</span></li>
                                <li><span><i className="fa fa-flag" />State : Delhi, INDIA</span></li>
                                <li><span><i className="fa fa-address-card" />Member Since : 24-Jul-2020</span></li>
                              </ul>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                    <div className="vendersearchlist">
                      <div className="col-sm-9 float-left">
                        <div className="rightColumns viewbookingright">
                          <div className="bookingdetail">
                            <div className="bookeddata">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="bookdetail">
                                      <h3>Booking Details</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="headerbudget">
                                      <div className="budgetprice">
                                        <b>Budget:</b> <i className="fa fa-inr" /> {bookingData.vehicle_budget}
                                      </div>
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail">
                                <ul className="list-unstyled">
                                  <li><span><div className="oneway"> {bookingData.booking_type}</div></span></li>
                                  <li><span><div className="bktitle">Booking Title:  {bookingData.booking_name}</div></span></li>
                                  <li><span>Pickup Location: <b>{bookingData.from_places}</b></span></li>
                                  <li><span>Stoppage During the trip :  <b>  {stopeges}</b></span></li>
                                  <li><span>Depart : <b>{bookingData.to_places}</b></span></li>
                                  <li><span>Pickup Time : <b>{bookingData.pickup}</b></span></li>

                                  <li><span>Number of Person : <b>{bookingData.no_of_adults} Adults + {bookingData.no_of_childrens } Childrens+ { bookingData.no_of_infants} infants</b></span></li>
                                  <li><span>Type of Vehicle : <b>{bookingData.vehicle_type}</b></span></li>
                                  <li><span>Total Kilometers : <b>570</b></span></li>
                                  <li><span>Description: <b>{bookingData.description}</b></span></li>
                                </ul>
                              </div>
                            </div>{/*End*/}
                            <div className="createquotation">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-7">
                                    <div className="bookdetail">
                                      <h3>Create Quotation on this Booking</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    <div className="headerbudget">
                                      <span>Booking ID:0000000</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                      <div className="quedit"><a href="" className="btnsho5">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option>One Way Trip</option>
                                        <option value={1}>One</option>        
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="quotbkedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option>One Way Trip</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="formtitle">
                                      <h5>Subject/Title of Booking</h5>
                                      <div className="quedit"><a href="" className="btnsho6">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Delhi to Manali Cab Booking" className="form-control" disabled />
                                    </div>
                                    <div className="quotintedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Subject/Title of Booking" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Pickup Location</h5>
                                      <div className="quedit"><a href="" className="btnsho7">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" disabled>
                                          <option value="Andhra Pradesh">Delhi NCR</option>
                                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                          <option value="Assam">Assam</option>
                                          <option value="Bihar">Bihar</option>
                                          <option value="Chandigarh">Chandigarh</option>
                                          <option value="Chhattisgarh">Chhattisgarh</option>
                                          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                          <option value="Daman and Diu">Daman and Diu</option>
                                          <option value="Delhi NCR">Delhi NCR</option>
                                          <option value="Lakshadweep">Lakshadweep</option>
                                          <option value="Puducherry">Puducherry</option>
                                          <option value="Goa">Goa</option>
                                          <option value="Gujarat">Gujarat</option>
                                          <option value="Haryana">Haryana</option>
                                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                          <option value="Jharkhand">Jharkhand</option>
                                          <option value="Karnataka">Karnataka</option>
                                          <option value="Kerala">Kerala</option>
                                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                                          <option value="Maharashtra">Maharashtra</option>
                                          <option value="Manipur">Manipur</option>
                                          <option value="Meghalaya">Meghalaya</option>
                                          <option value="Mizoram">Mizoram</option>
                                          <option value="Nagaland">Nagaland</option>
                                          <option value="Odisha">Odisha</option>
                                          <option value="Punjab">Punjab</option>
                                          <option value="Rajasthan">Rajasthan</option>
                                          <option value="Sikkim">Sikkim</option>
                                          <option value="Tamil Nadu">Tamil Nadu</option>
                                          <option value="Telangana">Telangana</option>
                                          <option value="Tripura">Tripura</option>
                                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                                          <option value="Uttarakhand">Uttarakhand</option>
                                          <option value="West Bengal">West Bengal</option>
                                        </select>
                                        <input type="text" name="searchArea" defaultValue placeholder="Pandav Nagar" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editpickup" style={{display: 'none'}}>
                                      <div className="book-locationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Delhi NCR</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi NCR">Delhi NCR</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                          </select>
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Starting point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                      <div className="quedit"><a href="" className="btnsho8">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" disabled>
                                          <option value="Andhra Pradesh">Manali</option>
                                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                          <option value="Assam">Assam</option>
                                          <option value="Bihar">Bihar</option>
                                          <option value="Chandigarh">Chandigarh</option>
                                          <option value="Chhattisgarh">Chhattisgarh</option>
                                          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                          <option value="Daman and Diu">Daman and Diu</option>
                                          <option value="Delhi NCR">Delhi NCR</option>
                                          <option value="Lakshadweep">Lakshadweep</option>
                                          <option value="Puducherry">Puducherry</option>
                                          <option value="Goa">Goa</option>
                                          <option value="Gujarat">Gujarat</option>
                                          <option value="Haryana">Haryana</option>
                                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                          <option value="Jharkhand">Jharkhand</option>
                                          <option value="Karnataka">Karnataka</option>
                                          <option value="Kerala">Kerala</option>
                                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                                          <option value="Maharashtra">Maharashtra</option>
                                          <option value="Manipur">Manipur</option>
                                          <option value="Meghalaya">Meghalaya</option>
                                          <option value="Mizoram">Mizoram</option>
                                          <option value="Nagaland">Nagaland</option>
                                          <option value="Odisha">Odisha</option>
                                          <option value="Punjab">Punjab</option>
                                          <option value="Rajasthan">Rajasthan</option>
                                          <option value="Sikkim">Sikkim</option>
                                          <option value="Tamil Nadu">Tamil Nadu</option>
                                          <option value="Telangana">Telangana</option>
                                          <option value="Tripura">Tripura</option>
                                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                                          <option value="Uttarakhand">Uttarakhand</option>
                                          <option value="West Bengal">West Bengal</option>
                                        </select>
                                        <input type="text" name="searchArea" defaultValue placeholder="Manali Bus Stand" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editdrp" style={{display: 'none'}}>
                                      <div className="book-destinationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Manali</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi NCR">Delhi NCR</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                          </select>
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Droping point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Add Stoppage</h5>
                                      <div className="quedit"><a href="" className="btnsho9">Edit</a>
                                      </div>
                                    </div>
                                    <div className="addstoppage">
                                      <input type="text" id="myInput" onKeyUp={myFunction()} placeholder="Search Stoppage..." title="Type in a name" />
                                      <div id="myUL">
                                        <div className="col-sm-3">
                                          <div className="stopbox">
                                            Chandigarh
                                            <a href="#"><i className="fa fa-times" /></a>
                                          </div>
                                        </div>
                                        <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                        <div className="col-sm-3"><div className="stopbox">Chandigarh <a href="#"><i className="fa fa-times" /></a></div></div>
                                        <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                      </div>
                                    </div>
                                    <div className="stoppageedit" style={{display: 'none'}}>
                                      <div className="addstoppage">
                                        <input type="text" id="myInput2" onKeyUp={myFunction()} placeholder="Search Stoppage..." />
                                        <div id="myUL">
                                          <div className="col-sm-3">
                                            <div className="stopbox">
                                              Chandigarh
                                              <a href="#"><i className="fa fa-times" /></a>
                                            </div>
                                          </div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Chandigarh <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Inclusions</h5>
                                      <div className="quedit"><a href="" className="btnsho10">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" placeholder="State Tax, Toll Tax Driver allowance Taxes" disabled defaultValue={""} />
                                    </div>
                                    <div className="inclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Inclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Inclusions</option>
                                              <option>Add Inclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Exclusions</h5>
                                      <div className="quedit"><a href="" className="btnsho11">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" placeholder="Parking
Night time allowance (11:00 PM to 06:00 AM)
Additional place/destination visit Any type of Permits and Entrance fees" disabled defaultValue={""} />
                                    </div>
                                    <div className="exclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Exclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Exclusions</option>
                                              <option>Add Exclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                      <div className="quedit"><a href="" className="btnsho12">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option>Hatchback</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="cabdetailedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option>Select Cab Type..</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Modal</h5>
                                      <div className="quedit"><a href="" className="btnsho13">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Dezire" className="form-control" disabled />
                                    </div>
                                    <div className="cabmodaledit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:Dezire" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                      <div className="quedit"><a href="" className="btnsho14">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={570} className="form-control" disabled />
                                    </div>
                                    <div className="kilometeredit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:570" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                      <div className="quedit"><a href="" className="btnsho15">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={4} className="form-control" disabled />
                                    </div>
                                    <div className="sittingedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:7" className="form-control" disabled />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Luggage Space</h5>
                                      <div className="quedit"><a href="" className="btnsho16">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option>2</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                      </select>
                                    </div>
                                    <div className="luggageedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option>Select Number of Bag..</option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Note:(Optional)</h5>
                                      <div className="quedit"><a href="" className="btnsho17">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" disabled defaultValue={""} />
                                    </div>
                                    <div className="noteedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>{/*END*/}
                            <div className="placebid">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="bookdetail">
                                      <h3>Place Bid on this Booking</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="placebidbook">
                                <p>You will be able to edit your bid until the booking is awarded to someone.</p>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Bid Details.</h5>
                                    </div>
                                    <span>Cab Details</span>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="input-group">
                                      <span className="input-group-btn">
                                        <i className="fa fa-inr" />
                                      </span>
                                      <input type="number" name="payment" value={quotations.payment} onChange={handleInputChanges} className="form-control" placeholder={6000} />
                                    </div>
                                  </div>
                                </div>
                                <div className="gstdescrip">The Total amount of booking after adding GST and our service charges:{quotations.payment} + 5% GST + 10% SC = <i className="fa fa-inr" /> {quotations.total_payment} </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Suggest a advance payment</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="payment">1st Payment</label>
                                    <div className="input-group">
                                      <span className="input-group-btn">
                                        <i className="fa fa-inr" />
                                      </span>
                                      <input type="number" value={quotations.payment_first} name="payment_first" onChange={handleInputChanges} className="form-control" placeholder={6000} />
                                    </div>
                                  </div>
                                  <div className="form-group col-sm-3">
                                    <a href="#">Check Payment Details</a>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-sm-4">
                                    <label htmlFor="payment">2st Payment</label>
                                    <div className="input-group">
                                      <span className="input-group-btn">
                                        <i className="fa fa-inr" />
                                      </span>
                                      <input type="number" value={quotations.payment_second} name="payment_second" onChange={handleInputChanges} className="form-control" placeholder={6000} />
                                    </div>
                                  </div>
                                  <div className="form-group col-sm-3">
                                    <a href="#">Check Payment Details</a>
                                  </div>
                                </div>
                                
                                <div className="row col-sm-12">
                                  <div className="form-group ">
                                    <div className="">
                                      <button onClick={() => handleAddFields()} className="btn btn-primary" >Add Another Installments</button>
                                      {inputFields.map((inputField, index) => (
                                        <Fragment key={`${inputField}~${index}`}>
                                          { 
                                            index > 0 ?
                                            <div className="row col-sm-12">

                                              <div className="form-group col-sm-4">
                                                  <label htmlFor="payment">Enter Amount {index}</label>
                                                  <div className="input-group">
                                                      <span className="input-group-btn">
                                                          <i className="fa fa-inr" />
                                                      </span>
                                                      <input type="number" value={inputField.payment} name="payment" onChange={event => handleInputChange(index, event)} className="form-control" placeholder={6000} />
                                                  </div>
                                              </div>
                                              <div className="form-group col-sm-3">
                                                  <a href="#">Check Payment Details</a>
                                              </div>

                                              <div className="form-group col-sm-3">
                                                  <a onClick={event => handleRemoveFields(index, event)} id="remove1" className=" remove-me">remove</a>
                                              </div>
                                            </div>
                                            :null
                                          }
                                        </Fragment>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  
                                <div className="placebidbtn">
                                  <a onClick={saveBid} className="btn btn-primary">Place Bid</a>
                                </div>
                              </div>
                            </div>
                          </div>{/*End*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Listing End*/}
          </div>
        </main>
      </div>
  )  
}  
  
export default Qutations