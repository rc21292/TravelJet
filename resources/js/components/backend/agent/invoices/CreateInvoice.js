import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import FlashMessage from 'react-flash-message'

import { useState, useEffect } from 'react'  

function CreateInvoice(props) { 

  const history = useHistory()
  const location = useLocation()

   const [user, setUser] = useState(false);

   let initialState ={
    customer_id: '',
    customer_name: '',
    user_id: '',
    booking_id: 0,
    sub_total: 0,
    tax: 0,
    total: 0,
    billing_address: '',
    invoice_date: '', 
    invoice_number: 1, 
    due_date: '', 
    status: 'unpaid'
  }

  const [invoiceData, setInvoiceData] = useState(initialState);

  const [bookingData, setBookingData] = useState({}); 
  const [bookingId, setBookingId] = useState(''); 
  const [customer, setCustomer] = useState({});   
  const [address, setAddress] = useState({});   
  const [error, setError] = useState('');   
  const [errors, setErrors] = useState({});   
  const [invoiceNo, setInvoiceNo] = useState(0);   

  const [invoiceDetail, setInvoiceDetail] = useState([]);


  useEffect(() => {

    let parts = location.pathname.split('/');
    let booking_id = parts.pop() || parts.pop();  

    setBookingId(booking_id);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);

        axios.get('/api/quotations/getBookedBooking/'+booking_id).then((result) => { 
        setBookingData(result.data); 
          setInvoiceDetail([{ booking_name: result.data.booking_name, booking_description: result.data.description, qty: 1, rate: result.data.payment, amount: result.data.payment}]); 

          let sub_total = result.data.payment;

          let tax = ((parseInt(sub_total)*15)/100);
          let total = parseInt(sub_total) + parseInt(tax);

          axios.get('/api/users/show/'+result.data.user_id)
          .then(response=>{
            if (response.data) {
              setCustomer(response.data);
              axios.get('/api/getCustomerAddresses/'+result.data.user_id)
              .then(response=>{
                setAddress(response.data);
                setInvoiceData({...invoiceData,'billing_address' : response.data.landmark+', '+response.data.locality+', '+response.data.address+', '+response.data.city+', '+response.data.state+' - '+response.data.pincode, 'customer_name' : response.data.name,'customer_id' : response.data.id,'booking_id' : parseInt(booking_id), 'user_id':AppState.user.id,'sub_total' : sub_total, 'tax' : tax, 'total' : total});
              });
            }
          });  

          axios.get('/api/getNextInvoiceNo')
              .then(response=>{
                setInvoiceNo(response.data);
              });     
        }); 
    }   

  }, []);  

  const updateSubTotal = (e) => {

    let add = 0;
    invoiceDetail.map((item) =>
      add += parseInt(item.amount)
      );

    let sub_total = add;

    let tax = ((parseInt(sub_total)*15)/100);
    let total = parseInt(sub_total) + parseInt(tax);

    setInvoiceData({...invoiceData, 'sub_total' : sub_total, 'tax' : tax, 'total' : total});

  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let amount = 0;
    if (name == 'rate') {
      amount = (invoiceDetail[index]['qty'])*value;
      const list = [...invoiceDetail];
      list[index]['rate'] = value;
      list[index]['amount'] = amount;
      setInvoiceDetail(list);
   }else if (name == 'qty') {
    if (invoiceDetail[index]['rate'] != '' && invoiceDetail[index]['rate'] > 0) {
      amount = (invoiceDetail[index]['rate'])*value;
    }else{
      amount = value;
    }
      const list = [...invoiceDetail];
      list[index]['qty'] = value;
      list[index]['amount'] = amount;
      setInvoiceDetail(list);
    }else{
      const list = [...invoiceDetail];
      list[index][name] = value;
      setInvoiceDetail(list);
    }
  };

  const handleChange = (event) => {
    const errors = {}
    let {name,value} = event.target;
    if (name == 'invoice_date') {
      var myDate = new Date(value);
        var today = new Date();
        if ( myDate < today ) { 
          errors["invoice_date"] = "Invoice Date must be garter than today's date!";
            setErrors(errors)
            return false;
        }
         errors["invoice_date"] = "";
            setErrors(errors)
    }

    if (name == 'due_date') {
      var myDate = new Date(value);
        var today = new Date(invoiceData.invoice_date);
        if ( myDate <= today ) { 
          errors["due_date"] = "Due Date must be garter than invoice date!";
            setErrors(errors)
            return false;
        }
         errors["due_date"] = "";
            setErrors(errors)
    }

    setInvoiceData({...invoiceData,[name] : value });
  }

  const handleRemoveClick = index => {
    const list = [...invoiceDetail];
    list.splice(index, 1);
    setInvoiceDetail(list);

    updateSubTotal();

  };

  const handleAddClick = () => {
    setInvoiceDetail([...invoiceDetail, { booking_name: '', booking_description: '', qty: 1, rate: '', amount: ''}]);
  };


   const saveInvoice = () => {
    setError('');
    const errors = {}
      if (invoiceData.total == '' || invoiceData.total < 1) {
        setError('Amount Field Required!');
        return false;
      }else{
        setError('');
      }


      var myDate = new Date(invoiceData.invoice_date);
      var today = new Date();
      if ( myDate < today ) { 
        errors["invoice_date"] = "Invoice Date must be garter than today's date!";
        setErrors(errors)
        return false;
      }

      if (invoiceData.invoice_date == '') {
        errors["invoice_date"] = "Field Required!";
        setErrors(errors)
        return false;
      }

      errors["invoice_date"] = "";
      setErrors(errors)

      if (invoiceData.invoice_date == '') {
        errors["due_date"] = "Field Required!";
        setErrors(errors)
        return false;
      }

      var myDate = new Date(invoiceData.due_date);
      var today = new Date(invoiceData.invoice_date);
      if ( myDate <= today ) { 
        errors["due_date"] = "Due Date must be garter than invoice date!";
        setErrors(errors)
        return false;
      }
      errors["due_date"] = "";
      setErrors(errors)


      var data = invoiceData;
      axios({
        method: 'post',
        url: '/api/invoices/store',
        data: data,
      })
      .then(response => {
        var data1 = invoiceDetail;
        axios({
          method: 'post',
          url: '/api/invoices/update/'+response.data,
          data: data1,
        })
        .then(response => {
         window.location.href = "/agent/invoices";
        })
      })
      .catch(e => {
        console.log(e);
      });
    }


    const saveSendInvoice = () => {
    setError('');
      if (invoiceData.total == '' || invoiceData.total < 1) {
        setError('Amount Field Required!');
        return false;
      }else{
        setError('');
      }

      var data = invoiceData;
      axios({
        method: 'post',
        url: '/api/invoices/store',
        data: data,
      })
      .then(response => {
        var data1 = invoiceDetail;
        axios({
          method: 'post',
          url: '/api/invoices/updateAndMail/'+response.data,
          data: data1,
        })
        .then(response => {
         window.location.href = "/agent/invoices";
        })
      })
      .catch(e => {
        console.log(e);
      });
    }

  return (  
      <div className="transactionhistory portfollopage">
        {/* Page Heading */}
        <form>
          <div className="generaldetail informationform">
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="inputnmae3" className="col-form-label">Customer Name</label>
                      <input type="text" name="customer_name" disabled onChange={handleChange} value={invoiceData.customer_name} className="form-control" placeholder="Customer Name" />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="inputname3" className="col-form-label">Billing Address</label>
                      <textarea name="billing_address" onChange={handleChange} value={invoiceData.billing_address} rows={5} cols={50} placeholder="Billing Address" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="inputname3" className="col-form-label">Invoice Date</label>
                      <input type="date" name="invoice_date" onChange={handleChange} value={invoiceData.invoice_date} className="form-control" /> 
                      <div style={{color:'red'}}>{errors.invoice_date}</div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="inputname3" className="col-form-label">Due Date</label>
                      <input type="date" name="due_date" onChange={handleChange} value={invoiceData.due_date} className="form-control" /> 
                      <div style={{color:'red'}}>{errors.due_date}</div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="inputnmae3" className="col-form-label">Invoice Number</label>
                      <input type="text" name="invoice_number" disabled className="form-control" value={invoiceNo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="customerdetail">
              <div className="col-sm-12">
                <hr /><table className="table leadstatus customerinvoice">
                  <thead className="thead-primary">
                    <tr>
                      <th scope="col" className="bd">Service</th>
                      <th scope="col">Description</th>
                      <th scope="col">Qty</th>
                      <th scope="col" className="sd">Rate</th>
                      <th scope="col">Amount</th>
                      <th scope="col" />
                    </tr>
                  </thead>

                    {invoiceDetail.map((x, i) => {
                      return ( <tbody key={i} className="customerbody">
                        <tr>
                          <td className="service"><textarea name="booking_name" value={x.booking_name} onChange={e => handleInputChange(e, i)} rows={5} cols={50} placeholder="Booking Delhi to Manali" className="form-control" /></td>
                          <td className="disc">
                            <textarea name="booking_description" value={x.booking_description} onChange={e => handleInputChange(e, i)} rows={5} cols={50} placeholder="Round trip booking for delhi to manali with stoppage chandigarh, kullu, rohtang" className="form-control" />
                          </td>
                          <td className="qty"><input type="number" name="qty" value={x.qty} onChange={e => handleInputChange(e, i)} className="form-control" placeholder={1} /></td>
                          <td className="rate"><input type="text" name="rate" value={x.rate} onBlur={updateSubTotal} onChange={e => handleInputChange(e, i)} className="form-control" placeholder={15000} /></td>
                          <td className="amt"><input type="text" name="amount" readOnly disabled value={x.amount} onChange={e => handleInputChange(e, i)} className="form-control" placeholder={15000} /></td>
                          <td className="iconview">
                            {invoiceDetail.length !== 1 && <a onClick={() => handleRemoveClick(i)} className="btn btn-danger"><i className="fa fa-trash" /></a> }                          </td>
                        </tr>
                        <tr colSpan={5}>
                          {invoiceDetail.length - 1 === i && <td className="addnew"><a onClick={handleAddClick}>Add New Line</a></td> }
                        </tr>
                      </tbody>
                      );
                    })}
                  <tbody className="totalbody">
                    <tr>
                      <td colSpan={5} className="lablename">Sub Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> {invoiceData.sub_total}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">GST 15% :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> {invoiceData.tax}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> <b>{invoiceData.total}</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row col-md-12">
                {error ? <FlashMessage duration={10000} persistOnHover={true}>
                    <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
            </div>
            <div className="placebidbtn movebtn">
              <a onClick={saveInvoice} className="btn btn-primary">Save</a>
              <a onClick={saveSendInvoice} className="btn btn-primary">Save &amp; Send</a>
            </div>
          </div></form>
      </div>
  )  
}  
  
export default CreateInvoice