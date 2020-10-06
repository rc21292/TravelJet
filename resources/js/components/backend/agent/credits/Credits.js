import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Credits(props) { 

  const history = useHistory()
  const location = useLocation()

   const [user, setUser] = useState(false);


  const [success, setSuccess] = useState('');

  const [credits, setCredits] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      console.log(AppState.user);
      setUser(AppState.user);

      const script = document.createElement("script")
    script.async = true
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)       

    axios('/api/credits').then(result=>{
        setCreditsData(result.data);
      });

      axios('/api/credits/getCredits/'+AppState.user.id).then(result=>{
        setCredits(result.data);
      });
    }   

  }, []);  

   const openCheckout = (event) => {

   let amount = event.currentTarget.dataset.amount;
    let new_amount = amount;
    let user_id = user.id;
    let options = {
      "key": "rzp_test_FvMwf7j3FOOnh8",
      "amount": amount*100,
      "name": "TravelJet",
      "description": "Pay to Add Balance",
      "image": "http://127.0.0.1:8000/frontend/image/logo.png",
      "handler": function (response){
        console.log(response);
        try {
         const paymentId = response.razorpay_payment_id;
         const query = {
          payment_id:paymentId,
          user_id:user_id,
          amount:(new_amount),
        }
        axios.post('/api/credits/save_user_credits',query)
        .then(response=>{
          setCredits(response.data.credits);
          setSuccess(' '+(response.data.added_credits)+' Credits Added Successfully!');
          });
      } catch (err) {
        console.log(err);
      }
    },
    "prefill": {
      "name": user.name,
      "email": user.email,
      "contact": user.phone,
    },
    "modal": {
        "ondismiss": function () {
            return false;
            // window.location.href ='/';
        },
    },
    "theme": {
      "color": "#F37254"
    }
  };
    
    let rzp = new Razorpay(options);
    rzp.open();
  }

  return (  
    <div className="travelcredit">
        {/* Page Heading */}
        <h1>Travel Jet - Credits</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="creditleft">
              <a data-amount="h1>" className="btn btn-dark">Credits Left: {credits}</a>
            </div>
          </div>
        </div>
        <div className="row col-sm-12">
           {success ? <FlashMessage duration={10000} persistOnHover={true}>
                <h5 className={"alert alert-info"}>success: {success}</h5></FlashMessage> : ''}
        </div>
        <div className="row">
        { creditsData.map((credit_data,i)=>{
                             return(
            <div key={i} className="col-sm-3">
              <div className="card2 text-center">
                <div className="card-content">
                  <div className="card-body py-3">
                    <div className="line-ellipsis">{credit_data.title}</div>
                    <div className="price">
                      <i className="fa fa-inr" /> {credit_data.cost}
                    </div>
                    <div className="agentname">
                      <h3>{credit_data.credits} Credits</h3>
                      <a onClick={openCheckout} data-amount={credit_data.cost} className="btn btn-light">Select Plan</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          })
        }
        </div>
      </div>
  )  
}  
  
export default Credits