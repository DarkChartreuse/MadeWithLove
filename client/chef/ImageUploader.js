import React from 'react';
import axios from 'axios';
import {bindAll} from 'lodash';


class ImageUploader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data_uri: null,
			processing: false
		}
		bindAll(this, 'handleFile', 'handleSubmit');
	}

	handleSubmit(e) {
		e.preventDefault();
		const context = this;

		this.setState({
			processing: true
		});
	
		// console.log('>>>>', this.state.data_uri, '>>>>>', this.state.filename, '>>>>>', this.state.filetype);

		var data = {
			data_uri: this.state.data_uri,
			filename: this.state.filename,
			filetype: this.state.filetype
		};

		axios.post('/api/uploadImage', data)
		  .then( (data) => {
		  	console.log('data.uri>>>>>>', data.data.uri);
		  	this.props.handleImage(data.data.uri);
			context.setState({
    	  	  processing: false,
    	  	  uploaded_uri: data.data.uri
		    });
		  })
		  .then( console.log('uploaded! >>>', this.state.uploaded_uri));
	}

	handleFile(e) {
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onload = (upload) => {
			this.setState({
				data_uri: upload.target.result,
				filename: file.name,
				filetype: file.type
			});
		};
		reader.readAsDataURL(file);
	}

	render() {
		let processing;
		let uploaded;

		if(this.state.uploaded_uri) {
			uploaded = (
				<div>
				  <p>Image uploaded!</p>
				 
				      <img className='imagepreview' src={this.state.uploaded_uri} />
				  
				  </div>
			
				
			);
		} else {
			uploaded = (
				<div>
				</div>
			);
		}

		if(this.state.processing) {
			processing = 'Processing image, hang tight!';
		}

		return (
			<div className="center">
			 <span className='input-field'>Upload your profile image</span>
			 <br/>
			 <br/>
			    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
			    	
			      <input type='file' onChange={this.handleFile} />
			      <br/>
			      <br/>

			      <button className="btn black-text menubuttons" disabled={this.state.processing} onClick={this.handleSubmit}>Upload Image</button>
			      {processing}
			    </form>
			    {uploaded}
			  </div>
		);
	}
}

export default ImageUploader;