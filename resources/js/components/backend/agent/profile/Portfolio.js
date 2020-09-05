import React, { Component } from 'react';
import { render } from 'react-dom';

import {Redirect} from "react-router-dom";


class Portfolio extends Component {  

  constructor() {
    super();
    this.state = {
      user:{},
      image : null,
      detail: '',
      title: '',
      errors: {
        detail: '',
        title: '',
        image: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.fileSelect = this.fileSelect.bind(this);

  }

  componentDidMount(){
  let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      this.setState({user:AppState.user});
    }  
  }



  validateForm () {

    let errors = {};
    let formIsValid = true;

    if (!this.state.image) {
      formIsValid = false;
      errors["image"] = "*Image required.";
    }

    if (!this.state.title) {
      formIsValid = false;
      errors["title"] = "*Title required.";
    }

    if (!this.state.detail) {
      formIsValid = false;
      errors["detail"] = "*Details required.";
    }

    this.setState({errors:errors});
    return formIsValid;
  }



   handleChange (event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'title': 
        errors.title = 
          value.length < 5
            ? 'Title must be 5 characters long!'
            : '';
            this.setState({[name]: value})
        break;
      case 'detail': 
        errors.detail = 
          value.length < 5
            ? 'Detail must be 5 characters long!'
            : '';
            this.setState({[name]: value})
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
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


  fileUpload () {
    event.preventDefault();
    if(!this.validateForm()) {
      return false;
    }
    const fd = new FormData();
    fd.append('image', this.state.image, this.state.image.name);
    fd.append('detail', this.state.detail);
    fd.append('title', this.state.title);
    fd.append('user_id', this.state.user.id);

    axios.post('/api/users/insertPortfolioImages/', fd, {
            headers: {
              'content-type': 'multipart/form-data',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res=>
      {
        window.location.href = "/login";
      });
  }


  render() {
    console.log(this.state.detail);
    console.log(this.state.title);
    console.log(this.state.image);
    const {errors} = this.state;
    return (
       <div className="transactionhistory portfollopage">
        {/* Page Heading */}
        <h1>Portfollo</h1>
        <div className="portfollo informationform">
          <form>
            <div className="form-group col-sm-8">
              <label htmlFor="labelname">Title</label>
              <input type="text" className="form-control" name="title" onChange ={this.handleChange} placeholder="Title" />
              <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.title}</div>
            </div>
            <div className="form-group col-sm-8">
              <label htmlFor="labelname">Details</label>
              <textarea className="form-control" name="detail" rows={4} cols={50} placeholder="Details" onChange ={this.handleChange} />
              <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.detail}</div>
            </div>
            <div className="form-group col-sm-8">
              <div className="uploadimage">
                <input type="file" name="image" onChange = {this.fileSelect} className="form-control-file" />
                <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.image}</div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="placebidbtn submitbtn col-sm-8">
              <a onClick ={this.fileUpload} className="btn btn-primary">Submit</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Portfolio