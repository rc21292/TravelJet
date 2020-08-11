import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Footer from './layouts/Footer'

class Index extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user_id : props.user_id
		}
	}


	componentDidMount(){

		if (this.state.user_id == '') {
			let appState = {
				isLoggedIn: false,
				user: null
			};
			localStorage["appState"] = JSON.stringify(appState);

		} else {

			axios.get("/api/users/show/"+this.state.user_id).then(response => {
				return response;
			}).then(json => {
				if (json.data) {
					let userData = {
						id: json.data.id,
						name: json.data.name,
						gender: json.data.gender,
						email: json.data.email,
						phone: json.data.phone,
						role: json.data.role,
					};
					let appState = {
						isLoggedIn: true,
						user: userData
					};
					localStorage["appState"] = JSON.stringify(appState);
				}
			})
		}
	}


  render() {
    return (
        <div>
        <Topbar/>
        <Header user_id={this.state.user_id}/>        
          
        <Footer/>
        </div>
    );
  }
}

if ( document.getElementById('root') ) {
ReactDOM.render(<Index user_id={user_id}/>, document.getElementById('root'));
}