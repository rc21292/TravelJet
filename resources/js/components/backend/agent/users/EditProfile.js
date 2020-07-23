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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      name: '',
      email: '',
      fileData : null,
      avtar : 'profile.png',
      phone: '',
      isUpdated : false,
      errors: {
        name: '',
        email: '',
        phone: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelect = this.fileSelect.bind(this)
    this.fileUpload = this.fileUpload.bind(this);
  }


  componentDidMount(){
  let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      this.setState({user:AppState.user,name:AppState.user.name,email:AppState.user.email,phone:AppState.user.phone});
      axios.get('/api/users/getprofile/'+AppState.user.id)
      .then(response=>{
        this.setState({avtar:response.data});
        // this.setState({fileData:response.data});
      });
    }  
  }


  fileSelect (event){
    this.setState({fileData: event.target.files[0]})
  }

  handleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phone': 
        errors.phone = 
          value.length < 8
            ? 'phone must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  fileUpload () {
    const fd = new FormData();
    fd.append('image', this.state.fileData, this.state.fileData.name);
    axios.post('/api/users/insertImages/', fd
      ).then(res=>
      {
        this.setState({ avtar : res.data})
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      event.preventDefault();
      const query = {
        name:this.state.name,
        email:this.state.email,
        phone:this.state.phone,
        avtar:this.state.avtar
      }
      let user_id = this.state.user.id;
      axios.post('/api/users/update/'+this.state.user.id,query).then(res=>
      {
        axios.get("/api/users/show/"+user_id).then(json => {
          if (json.data) {
            let userData = {
              id: json.data.id,
              name: json.data.name,
              email: json.data.email,
              phone: json.data.phone,
              role: json.data.role,
            };
            let appState = {
              isLoggedIn: true,
              user: userData
            };
            // localStorage["appState"] = JSON.stringify(appState);
            localStorage.setItem('appState', JSON.stringify(appState));
          }
        });

        this.setState({isUpdated: true});

        window.scrollTo(0, 0);

        // window.location.reload(false);

        // this.props.history.push("/agent/profile/edit");

        // window.location.reload(false);
      }
      );
    }else{
      console.error('Invalid Form')
    }
  }

  render() {
    const {errors} = this.state;
    return (
       <div className="ms-content-wrapper">
        <div className="row">
        { this.state.isUpdated ? <div class="alert alert-success alert-solid" role="alert">
                <strong>Well done!</strong> Profile Updated sucessfully!.
              </div> : ''}
          <div className="col-xl-12 col-md-12 col-xs-12">
            <div className="ms-panel">
              <div className="ms-panel-header">
                <h6>User Details</h6>
              </div>
              <div className="ms-panel-body">                
                  <div className="col-md-12 mb-6">
                    { this.state.fileData ? <img className="img-fluid ms-profile-img" src={'/uploads/users/temp/'+this.state.avtar} alt="preview" /> :
                    <img className="img-fluid ms-profile-img" src={'/uploads/users/'+this.state.user.id+'/'+this.state.avtar} alt="file" /> }
                  </div>
                  <br/>
                  <div className="col-md-12 mb-6">
                  <input type="file" onChange = {this.fileSelect} />
                  <button onClick ={this.fileUpload}>Upload</button>
                  </div> 
                    <hr/>
                    <form onSubmit={this.handleSubmit} noValidate >
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">Full Name</label>
                      <div className="input-group">
                        <input type="text" value={this.state.name} className="form-control" name="name" placeholder="First name" id="validationCustom01" onChange={this.handleChange}/>
                        <div className="col-md-12 mb-3">{errors.name.length > 0 && <span style={{ color:'red'}} className='error'>{errors.name}</span>}</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom02">Email Address</label>
                      <div className="input-group">
                        <input type="email" value={this.state.email} className="form-control" name='email' placeholder="Email Address" id="validationCustom02" onChange={this.handleChange}/>
                          <div className="col-md-12 mb-3">{errors.email.length > 0 && <span style={{ color:'red'}} className='error'>{errors.email}</span>}</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom03">Phone Number</label>
                      <div className="input-group">
                        <input type="number" value={this.state.phone}  name="phone" className="form-control" placeholder="Phone Number" id="validationCustom03" onChange={this.handleChange}/>
                        <div className="col-md-12 mb-3">{errors.phone.length > 0 && <span style={{ color:'red'}} className='error'>{errors.phone}</span>}</div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary mt-4">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile