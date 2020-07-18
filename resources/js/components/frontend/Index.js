import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Footer from './layouts/Footer'

class Index extends Component {
  render() {
    return (
        <div>
        <Topbar/>
        <Header/>        
            
        <Footer/>
        </div>
    );
  }
}

if ( document.getElementById('root') ) {
ReactDOM.render(<Index/>, document.getElementById('root'));
}