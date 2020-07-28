import React, { Component } from 'react';
import { render } from 'react-dom';


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class EditPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	user:{},
      name: '',
      email: '',
      image : null,
      portfolioData : [],
      link: '',
      isUpdated : false,
      errors: {
        link: '',
        image: ''
      }
    };
    this.fileSelect = this.fileSelect.bind(this);
    this.linkSelect = this.linkSelect.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }


  componentDidMount(){
  let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      this.setState({user:AppState.user,name:AppState.user.name,email:AppState.user.email,phone:AppState.user.phone});
      axios.get('/api/users/getProfilePortfolio/'+AppState.user.id)
      .then(response=>{
      	console.log(response.data);
        this.setState({portfolioData:response.data});
      });
    }  
  }


  fileSelect (event){
  	 event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if(value.length < 5){
    	errors.name = 
    	value.length < 5
    	? 'Name must be 5 characters long!'
    	: '';    	
    	this.setState({errors, [name]: value});
    	return;
    }

    this.setState({image: event.target.files[0]})
  }

  linkSelect (event){
  	 event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if(value.length < 5){
    	errors.name = 
    	value.length < 5
    	? 'Name must be 5 characters long!'
    	: '';    	
    	this.setState({errors, [name]: value});
    	return;
    }
    this.setState({link: event.target.value})
  }


   onDelete(user_id){
      axios.delete('/api/users/deletePortfolioImage/'+user_id)
      .then(response=>{
    location.reload();
      });

    }

  fileUpload () {

  	 event.preventDefault();
    if(validateForm(this.state.errors)) {
      event.preventDefault();
      const query = {
        image:this.state.image,
        link:this.state.link
      }
  }
   

    const fd = new FormData();
    fd.append('image', this.state.image, this.state.image.name);
    fd.append('link', this.state.link);
    fd.append('user_id', this.state.user.id);
    axios.post('/api/users/insertPortfolioImages/', fd
      ).then(res=>
      {
        this.setState({ avtar : res.data})
      });
  
}

  render() {
    const {errors} = this.state;
    return (
       <div className="ms-content-wrapper">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-xs-12">
              <div className="ms-panel">
                <div className="ms-panel-header">
                  <h6>Portfolio Details</h6>
                </div>
                <div className="ms-panel-body">                
                  <div className="row">
                    {  
                      this.state.portfolioData.map((portfolio, idx) => {  
                      return <div className="col-md-4 p-2" key={idx}>
                        <a className="  gallery__item" href={portfolio.id} target="_blank">
                          <img width="400" className="gallery__img" src={'/uploads/users/portfolios/'+this.state.user.id+'/'+portfolio.image} />
                        </a> 
                        <center>
                          <button className="btn btn-danger" onClick={this.onDelete.bind(this,portfolio.id)}>Delete</button>
                        </center>
                      </div>
                      })
                    }
                  </div>
                </div>
                { this.state.isUpdated ? <div class="alert alert-success alert-solid" role="alert">
                  <strong>Well done!</strong> Profile Updated sucessfully!.
                </div> : '' }
                <div className="col-xl-12 col-md-12 col-xs-12">
                  <div className="ms-panel">
                    <div className="ms-panel-header">
                      <h6>Upload Image</h6>
                    </div>
                    <div className="ms-panel-body">                 
                      <br/>
                      <div className="col-md-12 row">
                      <div className="col-md-4">
                        Enetr Link : <input type="text" className="form-control" onChange = {this.linkSelect} />
                        </div>
                      <div className="col-md-4">
                        Select File : <input type="file" className="form-control" onChange = {this.fileSelect} />
                        </div>
                      <div className="col-md-4">
                        <button className="btn btn-primary" onClick ={this.fileUpload}>Upload</button>
                        </div>
                      </div> 
                      <hr/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default EditPortfolio