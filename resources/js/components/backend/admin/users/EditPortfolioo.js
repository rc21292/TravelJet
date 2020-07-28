import React, { Component } from 'react';
import { render } from 'react-dom';

class EditPortfolio extends Component {
	constructor(props) {
		super(props);
		this.state ={
			image: '',
			link: '',
			sucess: false,
			error: false,
			imagePreviewUrl: false
		}
		this.fileUpload = this.fileUpload.bind(this)
		this.onChangeFile = this.onChangeFile.bind(this);
		this.onChangeLink = this.onChangeLink.bind(this);
	}


	componentDidMount(){
		let stateqq = localStorage["appState"];
		if (stateqq) {
			let AppState = JSON.parse(stateqq);
			this.setState({user:AppState.user,name:AppState.user.name,email:AppState.user.email,phone:AppState.user.phone});
			axios.get('/api/users/getprofile/'+AppState.user.id)
			.then(response=>{
				//this.setState({avtar:response.data});
			});
		}  
	}

	fileUpload(){
		const values = {
			'link' : this.state.link,
			'image' : this.state.image
		}
		var self = this;
		axios.post('/api/users/insertPortfolioImages/',  values, { headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
			if(res.data === '1'){
				self.setState( { sucess : true});
				window.location.replace("/dashboard");
			}else{
				self.setState( { errorInsert : true});
			}
		}).catch((e)=>{
			console.log(e);
			window.sessionStorage.clear();
			window.location.replace('/'); 
		});
	}


	onChangeLink(e) {
		this.setState({
				link: e.target.value
			})
	}

	onChangeFile(e) {
		let files = e.target.files || e.dataTransfer.files;
		if (!files.length)
			return;
		this.createImage(files[0]);
	}

	createImage(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
			this.setState({
				image: e.target.result
			})
		};
		reader.readAsDataURL(file);
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
			
			<form onSubmit={this.onFormSubmit}  encType="multipart/form-data" >
			<h1>Insert Material</h1>
			<label className="label_imagem_artigo"> Imagem do artigo: </label>
			<input className="input_imagm_artigo" type="text" onChange={this.onChangeLink} />
			<input className="input_imagem_artigo" type="file" onChange={this.onChangeFile} />
			<div className="imgPreview">
			{ this.state.imagePreviewUrl ?  (<img className="add_imagem" Name="add_imagem" src={this.state.imagePreviewUrl} />) : ( 'Upload image' )
		}
		</div>
		</form>
		</div>
		</div>
		</div>
		</div>
		</div>
		);
	}
}

export default EditPortfolio