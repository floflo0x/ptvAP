import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function AddPlan() {
	const [ name, setEnteredName ] = useState('');
	const [ duration, setEnteredDuration ] = useState('');
	const [ amount, setEnteredAmount ] = useState('');

	const [ fid, setFId ] = useState('');
	const [ btn, setBtn ] = useState('submit');
	const navigate = useNavigate();

	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
  	let id = queryParams.get('id') || '';

  	// console.log(id);

	const nameChangeHandler = (event) => {
		setEnteredName(event.target.value);
	}

	const durationChangeHandler = (event) => {
		setEnteredDuration(event.target.value);
	}

	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	}

	const submitHandler = async (event) => {
		event.preventDefault();

		// console.log(question, answer);

		if (name === '' || amount === '' || duration === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
	    formData.append('name', name);
	    formData.append('amount', amount);
	    formData.append('duration', duration);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/postPlan.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);

		setFId('');
		setEnteredName('');
		setEnteredDuration('');
		setEnteredAmount('');
		navigate("/plan");
	}

	const editHandler = async (event) => {
		event.preventDefault();

		// console.log("editing...", question, answer, fid);

		if (name === '' || amount === '' || duration === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
	    formData.append('id', fid);
	    formData.append('name', name);
	    formData.append('amount', amount);
	    formData.append('duration', duration);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/postEditPlan.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);

		setFId('');
		setEnteredName('');
		setEnteredDuration('');
		setEnteredAmount('');
		navigate("/plan");
	}

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/editPlan.php/?id=${id}`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data);

		    if (data.length >= 1) {
		    	setBtn('update');
		    	setFId(data[0].id);
		    	setEnteredName(data[0].name);
		    	setEnteredDuration(data[0].duration);
				setEnteredAmount(data[0].amount);
		    }
		}

		fetchData();
	}, []);

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<Navbar />

				<div className="col-12 col-sm-12 col-md-3 mt-5"></div>				

				<div className="col-12 col-sm-12 col-md-6 mt-5 border p-5" 
					style={{ borderRadius: '10px' }}
				>
					<div className="col-12 col-sm-12 col-md-12 mb-5 text-center">
						<h3>ADD PLANs</h3>
				    </div>

				    <form onSubmit={ btn == 'submit' ? submitHandler : editHandler }>
				    	<div className="mb-3">
						  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
						  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value={name} onChange={nameChangeHandler} />
						</div>
						<div className="mb-3">
						  <label htmlFor="exampleFormControlInput1" className="form-label">Duration</label>
						  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value={duration} onChange={durationChangeHandler} />
						</div>
						<div className="mb-3">
						  <label htmlFor="exampleFormControlInput1" className="form-label">Amount</label>
						  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="" value={amount} onChange={amountChangeHandler} />
						</div>
					  	<button type="submit" className="btn btn-primary">
					  		{btn == 'submit' ? 'Submit' : 'Edit'}
					  	</button>
				    </form>
				</div>

				<div className="col-12 col-sm-12 col-md-3 mt-5"></div>				
			</div>
		</div>
	);
}

export default AddPlan;