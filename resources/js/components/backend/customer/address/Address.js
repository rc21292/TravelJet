import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Address extends Component {
	render() {
		return (
            
			<div className="manageaddress-page">
  {/* Page Heading */}
  <h1>Manage Addresses</h1>
  <div className="customer-detail" id="test">
    <div className="panel panel-default test" style={{display: 'block'}}>
      <div className="panel-heading"><i className="fa fa-plus" /> ADD NEW ADDRESS</div>
    </div>
    <form className="newaddress forminput" style={{display: 'none'}}>
      <div className="heading">ADD NEW ADDRESS</div>
      <div className="row">
        <div className="form-group col-sm-4">
          <input type="text" name="title" placeholder="Name" className="form-control" />
        </div>
        <div className="form-group col-sm-4">
          <input type="number" name="title" placeholder="10-dist mobile number" className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-4">
          <input type="number" name="title" placeholder="Pincode" className="form-control" />
        </div>
        <div className="form-group col-sm-4">
          <input type="text" name="title" placeholder="Locality" className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-8">
          <textarea name="w3review" rows={4} cols={50} placeholder="Address (Area and Street)" className="form-control" defaultValue={""} />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-4">
          <input type="text" name="title" placeholder="City / District / Town" className="form-control" />
        </div>
        <div className="form-group col-sm-4">
          <select className="custom-select form-control" id="inputGroupSelect01">
            <option selected>State</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-4">
          <input type="number" name="title" placeholder="Landmark (Optional)" className="form-control" />
        </div>
        <div className="form-group col-sm-4">
          <input type="text" name="title" placeholder="Alternate Phone (Optional)" className="form-control" />
        </div>
      </div>
      <div className="addresstype">
        <div className="row">
          <div className="col-sm-12">
            <div className="addtype">
              Address Type
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Home
              </label>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Work
              </label>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <a href="#" className="btn btn-primary">Save</a>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <a href="#">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div className="customerinfo">
    <table className="table">
      <tbody>
        <tr>
          <td><span>Work</span></td>
        </tr>
        <tr>
          <td className="namewith">Avinash Kumar</td>
          <td>9953495051</td>
        </tr>
        <tr>
          <td>C-6, Sector 7, Noida, Uttar Pradesh- 208013</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="customerinfo">
    <table className="table">
      <tbody>
        <tr>
          <td><span>Work</span></td>
        </tr>
        <tr>
          <td className="namewith">Avinash Kumar</td>
          <td>9953495051</td>
        </tr>
        <tr>
          <td>C-6, Sector 7, Noida, Uttar Pradesh- 208013</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


		);
	}
}