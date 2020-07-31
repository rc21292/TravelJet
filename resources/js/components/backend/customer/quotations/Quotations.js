import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Quotations extends Component {
	render() {
		return (
            <div className="quotation-page">
				{/* Page Heading */}
				<h1>Quotation</h1>
				<table className="table table-bordered booking">
					<thead className="thead-primary">
						<tr>
							<th scope="col">Date</th>
							<th scope="col">My Booking</th>
							<th scope="col" />
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>22-June-20</td>
							<td>Booking for Delhi to Manali</td>
							<td className="iconview">
								<a href="#"><i className="fa fa-eye" /></a>
								<a href="#"><i className="fa fa-pencil" /></a>
								<a href="#"><i className="fa fa-trash" /></a>
							</td>
							<td><a href="#" className="btn btn-default">View More</a></td>
						</tr>
						<tr>
							<td>22-June-20</td>
							<td>Booking for Delhi to Manali</td>
							<td className="iconview">
								<a href="#"><i className="fa fa-eye" /></a>
								<a href="#"><i className="fa fa-pencil" /></a>
								<a href="#"><i className="fa fa-trash" /></a>
							</td>
							<td><a href="#" className="btn btn-default">View More</a></td>
						</tr>
					</tbody>
				</table>
			</div>

		);
	}
}