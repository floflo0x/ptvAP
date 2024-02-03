import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
	const [ email, setEnteredEmail ] = useState('');
	const [ psword, setEnteredPsword ] = useState('');

	const navigate = useNavigate();

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	}

	const pswordChangeHandler = (event) => {
		setEnteredPsword(event.target.value);
	}

	const submitHandler = async(event) => {
		event.preventDefault();

		// console.log(email, psword);
		if (email === '' || psword === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
	    formData.append('email', email);
	    formData.append('password', psword);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/adminAuth.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response.data.isSuccess);

		if (response.data.isSuccess) {
			Cookies.set('isLoggedIn', true);
			navigate('/users');
		}

		setEnteredEmail('');
		setEnteredPsword('');
	}

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-12 col-sm-12 col-md-3"></div>
				<div className="col-12 col-sm-12 col-md-6 border p-5" 
					style={{ borderRadius: '10px' }}
				>
					<div className="col-12 col-sm-12 col-md-12 mb-5 text-center">
						<h3>SIGN IN</h3>
				    </div>

					<form onSubmit={submitHandler}>
					  <div className="mb-3">
					    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={emailChangeHandler} aria-describedby="emailHelp" />
					  </div>
					  <div className="mb-3">
					    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					    <input type="password" className="form-control" id="exampleInputPassword1" value={psword} onChange={pswordChangeHandler} />
					  </div>
					  <div className="mb-3 form-check">
					    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
					    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
					  </div>
					  <button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
				<div className="col-12 col-sm-12 col-md-3"></div>
			</div>
		</div>
	);
}

export default Login;