import React, { Component } from 'react';
import { render } from 'react-dom';

import {Redirect} from "react-router-dom";


class Portfolio extends Component {  

  constructor() {
    super();
    this.state = {
      user:{},
      portfoliosData : [],
      portfolioData: {},
      image : '',
      detail: '',
      title: '',
      errors: {
        detail: '',
        title: '',
        image: ''
      }
    };
    this.editPortfolio = this.editPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.editPortfolioData = this.editPortfolioData.bind(this);
    this.fileSelect = this.fileSelect.bind(this);

  }

  componentDidMount(){
  let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      this.setState({user:AppState.user});

      axios.get('/api/users/getAgentPortfolio/'+AppState.user.id)
        .then(response=>{
          if (response.data) {
            this.setState({portfoliosData:response.data});
          }
      });

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


    editPortfolioData () {

    var bodyFormData = new FormData();
    bodyFormData.set('detail', this.state.detail);
    bodyFormData.set('title', this.state.title);
    bodyFormData.set('user_id', this.state.user.id);
    bodyFormData.set('id', this.state.portfolioData.id);
    bodyFormData.append('image', this.state.image);
    axios({
    method: 'post',
    url: '/api/users/updatePortfolioImages',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        window.location.reload(false);
    })
    .catch(function (response) {
        console.log(response);
    });
   
  }


  fileUpload () {
    event.preventDefault();
    if(!this.validateForm()) {
      return false;
    }

    var bodyFormData = new FormData();
      bodyFormData.set('detail', this.state.detail);
    bodyFormData.set('title', this.state.title);
    bodyFormData.set('user_id', this.state.user.id);
    bodyFormData.append('image', this.state.image);
    axios({
    method: 'post',
    url: '/api/users/insertPortfolioImages',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        window.location.reload(false);
    })
    .catch(function (response) {
        console.log(response);
    });
   
  }


  editPortfolio (id) {  
    axios({
    method: 'get',
    url: '/api/users/showPortfolio/'+id,
    })
    .then(response => { 
      this.setState({ portfolioData: response.data })
      this.setState({ title: response.data.title })
      this.setState({ detail: response.data.detail })
    })
  }


  deletePortfolio (id) {  
    axios({
    method: 'delete',
    url: '/api/users/deletePortfolio/'+id,
    })
    .then(response => { 
      window.location.reload(false);
    })
  }


  render() {
    const {errors} = this.state;
    return (
       <div className="transactionhistory portfollopage">
        {/* Page Heading */}
        <h1>Portfolio</h1>
        <div className="portfollo informationform">
          <form>
            <div className="form-group col-sm-8">
              <label htmlFor="labelname">Title</label>
              <input type="text" className="form-control" name="title" onChange ={this.handleChange} value={this.state.title} placeholder="Title" />
              <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.title}</div>
            </div>
            <div className="form-group col-sm-8">
              <label htmlFor="labelname">Details</label>
              <textarea className="form-control" name="detail" rows={4} cols={50} placeholder="Details" onChange ={this.handleChange} value={this.state.detail} />
              <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.detail}</div>
            </div>
            <div className="form-group col-sm-8">
              <div className="uploadimage">
                <input type="file" name="image" onChange = {this.fileSelect} className="form-control-file" />
                <div className="errorMsg" style={{ color: '#FF0000' }}>{errors.image}</div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="placebidbtn submitbtn col-sm-12">
            {this.state.portfolioData.title ?
              <a onClick ={this.editPortfolioData} className="btn btn-primary">Edit</a>
              :
              <a onClick ={this.fileUpload} className="btn btn-primary">Submit</a>
            }
            </div>
          </form>
        </div> 
        <div className="clearfix" /> 
      <hr/>
      <div className="clearfix" />
        <div className="row">
            <div className="col-md-12"><h1>Portfolio List</h1></div>
              {
                this.state.portfoliosData.map((user,i)=>{
                  return (
                    <div key={i} className="col-sm-3" style={{minHeight:'400px'}}>
                    <img style={{minHeight:'200px'}} className="img-responsive" src={'/uploads/users/portfolios/'+user.user_id+'/'+user.image} alt="" />
                    <div>{user.title}</div>
                    <div>{user.detail}</div>
                    <div className="placebidbtn submitbtn col-sm-12">
              <a onClick ={() => this.editPortfolio(user.id)} className="btn btn-primary">Edit</a>&nbsp;&nbsp;
              <a  onClick ={() => this.deletePortfolio(user.id)} className="btn btn-danger">Delete</a>
            </div>
                </div>
                    )
                })
              }
          </div>
      </div>
    );
  }
}

export default Portfolio