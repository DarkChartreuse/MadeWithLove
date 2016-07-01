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
		  	this.props.handleProfile(data.data.uri);
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
				  <h3>Image uploaded!</h3>
				  <div className="col s12 m5">
				    <div className="card-panel valign-wrapper">
				      <img className='image-preview' style={{width:'400px'}} src={this.state.uploaded_uri} />
				    </div>
				  </div>
			      <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
				</div>
			);
		} else {
			uploaded = (
				<div>
				  <div className="col s12 m5">
				    <div className="card-panel valign-wrapper">
				      <h2>Upload an image</h2>
				    </div>
				  </div>
				</div>
			);
		}

		if(this.state.processing) {
			processing = 'Processing image, hang tight!';
		}

		return (
			<div className='row'>
			  <div className='col-sm-12'>
			    <label>Upload an image</label>
			    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
			      <input type='file' onChange={this.handleFile} />
			      <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
			      {processing}
			    </form>
			    {uploaded}
			  </div>
			</div>
		);
	}
}

export default ImageUploader;