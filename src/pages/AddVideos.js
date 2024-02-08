import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './video.css';

function AddVideos() {
	const navigate = useNavigate();

	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
  	let id = queryParams.get('id') || '';

  	const [name, setName] = useState('');
  	const [code, setCode] = useState('');
  	const [title, setTitle] = useState('');
  	const [skip, setSkip] = useState('');
  	// const [showBtn, setShowBtn] = useState(false);
  	const [ fid, setFId ] = useState('');
	const [ btn, setBtn ] = useState('submit');
	const [ url, setUrl ] = useState('');

  	// console.log(id);

  	const handleVideoUpload = async () => {
  		const fileInput = document.getElementById('movieFile');
  		const file = fileInput.files[0];
  		// console.log(file);

  		setName(file.name);

  		if (file) {
		    const formData = new FormData();
		    formData.append('file', file);

		    try {
		      	const response = await axios.post(`https://mateys.xyz/web_api/admin/uploadVideo.php`, formData, {
		        	headers: {
		          		'Content-Type': 'multipart/form-data'
		        	}
		      	});

		      	// Handle the response as needed
		      	// console.log(response.data, response.data.isSuccess);

		      	if (response.data.isSuccess) {
		      		setCode("https://mateys.xyz/web_api/admin/uploads/"+response.data.videoName);
		      	}
		    } 
		    catch (error) {
		      	// Handle the error
		      	console.log(error);
		      	alert('Failed... Try Again...');
		    }
		} else {
		    // Handle the case when no file is chosen
		   setName('No file chosen');
		}
  	}

  	// console.log(code);

	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	}

	const skipChangeHandler = (event) => {
		setSkip(event.target.value);
	}

	const submitHandler = async (event) => {
		event.preventDefault();

		if (code === '' || title === '' || skip === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
		formData.append('video', code);
		formData.append('name', title);
		formData.append('skip_duration', skip);

		// console.log(image);

		const response = await axios.post('https://mateys.xyz/web_api/admin/postVideo.php', formData, {
		    headers: {
	      		'Content-Type': 'multipart/form-data', // Set the content type for FormData
	    	},
		    maxBodyLength: Infinity,
		});

		// console.log(response.data);

		setSkip('');
		setName('');
		setTitle('');
		setCode('');
		navigate('/videos');
		window.location.reload();
	}

	const editHandler = async (event) => {
		event.preventDefault();

		// console.log("editing...", question, answer, fid);

		if (title === '' || skip === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
		formData.append('id', fid);
		if (!code) {
	    	formData.append('video', url);
		}
		else {
	    	formData.append('video', code);
		}
		formData.append('name', title);
		formData.append('skip_duration', skip);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/postEditVideo.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);

		setSkip('');
		setName('');
		setTitle('');
		setCode('');
		setUrl('');
		navigate('/videos');
		window.location.reload();
	}

	const deleteClickHandler = async (id) => {
	    setUrl('');
	}

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/editVideo.php/?id=${id}`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data);

		    if (data.length >= 1) {
		    	setBtn('update');
		    	setFId(data[0].id);
		    	setTitle(data[0].name);
		    	setSkip(data[0].skip_duration);
		    	setUrl(data[0].video);
		    }
		}

		fetchData();
	}, []);

  	return (
  		<div className="container-fluid mt-5 p-3">
			<div className="row">
				<Navbar />

				<div 
					className="col-12 col-sm-12 col-md-12 mt-5 border p-5" 
					style={{ borderRadius: '10px' }}
				>
					<div className="row border-0 mb-4">
						{url && (
							<div className="col-12 col-sm-12 d-flex">
								<video width="320" height="200" controls className="mb-3">
									<source src={url} type="video/mp4" />
								</video>
								<button className="btn border-0 bg-transparent ms-5" onClick={() => deleteClickHandler(fid)}>
							      	<i className="fa-solid fa-trash-can" style={{ color: '#eb0510' }}></i>
							    </button>
							</div>
						)}
						{code && (
			                <div className="col-12 col-sm-6 col-md-8 col-lg-5 border text-sm-center p-0" id="embed-responsive">
			                  <div className="embed-responsive embed-responsive-16by9">
			                    <div id="image" className="uploaded-text">UPLOADED</div>
			                  </div>
			                </div>
			            )}
			            {!code && (
		                <div className="col-12 col-sm-6 col-md-8 col-lg-5 video-uploader" id="video-uploader">
		                  <label className="file-label" htmlFor="movieFile" id="fileLabel">
		                    <i className="fa-solid fa-file-video"></i> Choose Video
		                  </label>
		                  <br />
		                  <input type="file" id="movieFile" className="file-input" accept="video/*" onChange={handleVideoUpload} />
		                  <span id="file_name" className="file-name">{ name ? ( <> {name} </>) : <>No file chosen</>}</span>
		                </div>
		                )}
		                <div className="col-12 col-sm-6 col-md-4 col-lg-5 text-start d-flex justify-content-between align-items-center" style={{ wordWrap: 'breakWord' }}>
		                  <p className="text-break">{ name ? ( <> {name} </>) : <>No file chosen</>}</p>
		                  <input type="hidden" className="border-0" id="movieName" value="" />
		                </div>
		                <div className="col-12 col-sm-12 col-md-12 col-lg-2 d-flex justify-content-between">
		                  <div id="spinner" className="spinner-border" role="status" style={{ display: 'none' }}>
		                    <span className="sr-only">Loading...</span>
		                  </div>
		                  <button type="button" className="btn upload-button border-0 d-none">
		                    <i className="fa-solid fa-cloud-arrow-up"></i>
		                  </button>
		                </div>
		            </div>

		        <form onSubmit={ btn == 'submit' ? submitHandler : editHandler }>
		            <div className="col-12 col-sm-6 mt-2 mb-2">
    					<label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    					<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={titleChangeHandler} />
		            </div>

		            <div className="col-12 col-sm-6 mt-2 mb-2">
    					<label htmlFor="exampleInputEmail1" className="form-label">Skip Duration</label>
    					<input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" min="1" value={skip} onChange={skipChangeHandler} />
		            </div>

		            <div className="col-12 col-sm-12 mt-2 mb-2 text-center">
  						<button type="submit" className="btn btn-primary">
  							{btn == 'submit' ? 'Submit' : 'Edit'}
  						</button>
  					</div>
		        </form>
				</div>
			</div>
		</div>
  	);
}

export default AddVideos;