import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Add from './Add'
import Listing from './Listing'
import Edit from './Edit'

export default class About extends Component {
	render() {
		return (
         <div className="pt-5 ml-5">
         <Router>
         <div className="row buttonbox">
         <div className="mr-2">
          <Link to="/querty/add" className="btn btn-primary">Post Query</Link>
          </div>
          <div className="mr-2">
          <Link to="/queries"  className="btn btn-success">Queries</Link>
          </div>
          </div>
         <Route exact path='/querty/add' component={Add} />
         <Route exact path='/queries' component={Listing} />
         <Route exact path='/queries/edit/:id' component={Edit} />
         </Router>
         </div>

		);
	}
}