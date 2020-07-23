import React, { Component } from 'react';
class Wallet extends Component {
  

  constructor(props) {

    super(props)
    this.state = {
    amount: 0,
    messages: '',
    visible: true,
    fade: true,
    balance: 0,
    error: false,
    userId: 0,
    userName: 0,
    userEamil: 0,
    userPhone: 0,
    isLoggedIn: false,
  };

  // let obj = this;


    this.changeAmount = this.changeAmount.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }


  componentDidMount(){

    let logstate = localStorage["appState"];
    if (logstate) {
      let AppState = JSON.parse(logstate);
      axios.get('/api/users/getbalance/'+AppState.user.id)
      .then(response=>{
        this.setState({
          balance:response.data.balance
        })
      });
      this.setState({
        userId: AppState.user.id,
        userEamil: AppState.user.email,
        userName: AppState.user.name,
        userPhone: AppState.user.phone
      });
    }

    const script = document.createElement("script")
    script.async = true
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)       

  }

    onDismiss()
    {
      this.setState({visible: false})
    }


  changeAmount(e) {
    if(e.target.value < 100){
      this.setState({error: true})
    }else{

    this.setState({amount: e.target.value})
    this.setState({error: false})
    }
  }
  openCheckout() {
     if(this.state.amount < 1){
      this.setState({error: true})
      return;
    }
    this.setState({error: false})
    let new_amount = this.state.amount;
    let user_id = this.state.userId;
    let options = {
      "key": "rzp_test_FvMwf7j3FOOnh8",
      "amount": this.state.amount,
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
          amount:(new_amount/100),
        }
        axios.post('/api/users/save_razorpay_details',query)
        .then(response=>{
          // this.obj.setState({ messages:response.data.messages,amount:0,fade:true });
          alert('Rs. '+(new_amount/100)+' Added Successfully please check wallet.');
          window.location.reload(false);
        });
      } catch (err) {
        console.log(err);
      }
    },
    "prefill": {
      "name": this.state.userName,
      "email": this.state.userEamil,
      "contact": this.state.userPhone,
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
  
  render () {
    return (
      <div className="ms-content-wrapper">
                 <div className="row">
                 <div className="col-md-12">
    Avilable Balance : {this.state.balance}
    </div>
    <div className="col-md-12">Add More Balance to Wallet</div>
    <div className="col-md-12">
        <input type='text' onChange={
           this.changeAmount
          } />
        <button onClick={this.openCheckout}>Pay Rs. {this.state.amount/100}</button> 
          { this.state.error ?<div className="error"> Amount must be grater than 100 </div> :'' }
      </div>
      </div>
      </div>
    )
  }
}

export default Wallet