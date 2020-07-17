import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Edit extends Component {
	constructor(props)
	{
		super(props);
		this.onChangeBookingType=this.onChangeBookingType.bind(this);
		this.onChangeStartAt=this.onChangeStartAt.bind(this);
		this.onChangeEndsOn=this.onChangeEndsOn.bind(this);
		this.onChangePickUp=this.onChangePickUp.bind(this);
		this.onChangeDropAt=this.onChangeDropAt.bind(this);
		this.onChangeDestination=this.onChangeDestination.bind(this);
		this.onChangeSightSeeing=this.onChangeSightSeeing.bind(this);
		this.onChangePersons=this.onChangePersons.bind(this);
		this.onChangeCabType=this.onChangeCabType.bind(this);
		this.onChangeBookIn=this.onChangeBookIn.bind(this);
		this.onChangeBudget=this.onChangeBudget.bind(this);
		this.onChangeDescription=this.onChangeDescription.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
      booking_type:'',
      start_at:'',
      end_on:'',
      pick_up:'',
      drop_on:'',
      destination:'',
      sight:'',
      persons:'',
      cab_type:'',
      book_in:'',
      budget:'',
      description:''
		}
	}

			componentDidMount(){
			axios.get('/api/queries/edit/'+this.props.match.params.id)
			.then(response=>{
              this.setState({booking_type:response.data.booking_type})
              this.setState({start_at:response.data.start_at})
              this.setState({end_on:response.data.end_on})
              this.setState({pick_up:response.data.pick_up})
              this.setState({drop_on:response.data.drop_on})
              this.setState({destination:response.data.destination})
              this.setState({sight:response.data.sight})
              this.setState({persons:response.data.persons})
              this.setState({cab_type:response.data.cab_type})
              this.setState({budget:response.data.budget})
              this.setState({booking_type:response.data.booking_type})
              this.setState({description:response.data.description})
			});
			
		}

	onChangeBookingType(e){
		this.setState({
			booking_type:e.target.value
		});
	}
	onChangeStartAt(e){
		this.setState({
			start_at:e.target.value
		});
	}
	onChangeEndsOn(e){
		this.setState({
			end_on:e.target.value
		});
	}
	onChangePickUp(e){
		this.setState({
			pick_up:e.target.value
		});
	}
	onChangeDropAt(e){
		this.setState({
			drop_on:e.target.value
		});
	}
	onChangeDestination(e){
		this.setState({
			destination:e.target.value
		});
	}
	onChangeSightSeeing(e){
		this.setState({
			sight:e.target.value
		});
	}
	onChangePersons(e){
		this.setState({
			persons:e.target.value
		});
	}
	onChangeCabType(e){
		this.setState({
			cab_type:e.target.value
		});
	}
	onChangeBookIn(e){
		this.setState({
			book_in:e.target.value
		});
	}
		onChangeBudget(e){
		this.setState({
			budget:e.target.value
		});
	}
		onChangeDescription(e){
		this.setState({
			description:e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();
		const query = {
			booking_type:this.state.booking_type,
      start_at:this.state.start_at,
      end_on:this.state.end_on,
      pick_up:this.state.pick_up,
      drop_at:this.state.drop_at,
      destination:this.state.destination,
      sight:this.state.sight,
      persons:this.state.persons,
      cab_type:this.state.cab_type,
      book_in:this.state.book_in,
      budget:this.state.budget,
      description:this.state.description
		}
		axios.post('/api/queries/update/'+this.props.match.params.id,query);
	}
	render() {
		return (
			<div>
<form className="col-sm-7" onSubmit={this.onSubmit}>
<div className="form-group">
<label>Booking Type</label>
<select className="form-control" 
id="booking_type"
value={this.state.booking_type}
onChange={this.onChangeBookingType}>
<option>One Way Trip</option>
<option>Round Trip</option>
<option>Round Trip with Sightseeing</option>
</select>
</div>
<div className="form-group">
<label>Starts at</label>
<input type="date" 
id="start_at" 
max="3000-12-31" 
min="1000-01-01" 
className="form-control"
value={this.state.start_at}
onChange={this.onChangeStartAt}/>
</div>
<div className="form-group">
<label>Ends On</label>
<input type="date" 
id="end_on" 
min="1000-01-01"
max="3000-12-31" 
className="form-control"
value={this.state.end_on}
onChange={this.onChangeEndsOn}/>
</div>
<div className="form-group">
<label>Pick Up</label>
<input type="text" 
className="form-control" 
id="pick_up" 
aria-describedby="emailHelp" 
placeholder="Enter Pick Up"
value={this.state.pick_up}
onChange={this.onChangePickUp}/>
<small id="emailHelp" className="form-text text-muted">Location where you want to start from.</small>
</div>
<div className="form-group">
<label>Drop at</label>
<input type="text" 
className="form-control" 
id="drop_on" 
aria-describedby="emailHelp" 
placeholder="Enter Drop Location"
value={this.state.drop_on}
onChange={this.onChangeDropAt}/>
<small id="emailHelp" className="form-text text-muted">Location where you want to Reach .</small>
</div>
<div className="form-group">
<label>Destination</label>
<input type="text" 
className="form-control" 
id="destination" 
placeholder="Enter Destination"
value={this.state.destination}
onChange={this.onChangeDestination}/>
</div>
<div className="form-group">
<label>Sight Seeing</label>
<select className="form-control" 
id="sight"
value={this.state.sight}
onChange={this.onChangeSightSeeing}>
<option>Yes</option>
<option>No</option>
</select>
</div>
<div className="form-group">
<label>No. of Persons</label>
<input type="text" 
className="form-control" 
id="persons" 
placeholder="Enter No. of Persons"
value={this.state.persons}
onChange={this.onChangePersons}/>
</div>
<div className="form-group">
<label>Cab Type</label>
<select className="form-control" 
id="cab_type"
value={this.state.cab_type}
onChange={this.onChangeCabType}>
<option>Sedan(4 Seater)</option>
<option>Innova(6 Seater)</option>
<option>SUV(7 Seater)</option>
</select>
</div>
<div className="form-group">
<label>Booking In</label>
<select className="form-control" 
id="book_in"
value={this.state.book_in}
onChange={this.onChangeBookIn}>
<option>Within 2 Days</option>
<option>Within 1 Week</option>
<option>Within 1 Month</option>
<option>Months +</option>
</select>
</div>
<div className="form-group">
<label>Budget</label>
<input type="text" 
className="form-control" 
id="budget" 
placeholder="Enter your Budget"
value={this.state.budget}
onChange={this.onChangeBudget}/>
</div>
<div className="form-group">
<label>Description:</label>
<textarea 
className="form-control" 
rows="5" 
id="description"
value={this.state.description}
onChange={this.onChangeDescription}>
></textarea>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
			);
	}
}