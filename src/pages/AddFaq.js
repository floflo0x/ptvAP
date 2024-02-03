import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function AddFaq() {
	const [ question, setEnteredQuestion ] = useState('');
	const [ answer, setEnteredAnswer ] = useState('');
	const [ fid, setFId ] = useState('');
	const [ btn, setBtn ] = useState('submit');
	const navigate = useNavigate();

	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
  	let id = queryParams.get('id') || '';

  	// console.log(id);

	const questionChangeHandler = (event) => {
		setEnteredQuestion(event.target.value);
	}

	const answerChangeHandler = (event) => {
		setEnteredAnswer(event.target.value);
	}

	const submitHandler = async (event) => {
		event.preventDefault();

		// console.log(question, answer);

		if (question === '' || answer === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
	    formData.append('question', question);
	    formData.append('answer', answer);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/postFaq.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);

		setFId('');
		setEnteredQuestion('');
		setEnteredAnswer('');
		navigate("/faq");
	}

	const editHandler = async (event) => {
		event.preventDefault();

		// console.log("editing...", question, answer, fid);

		if (question === '' || answer === '') {
			alert('Please enter some data...');
        	return; // Don't submit the data if question or answer is empty
    	}

		const formData = new FormData();
	    formData.append('id', fid);
	    formData.append('question', question);
	    formData.append('answer', answer);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/postEditFaq.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);

		setFId('');
		setEnteredQuestion('');
		setEnteredAnswer('');
		navigate("/faq");
	}

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/editFaq.php/?id=${id}`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data);

		    if (data.length >= 1) {
		    	setBtn('update');
		    	setFId(data[0].id);
		    	setEnteredQuestion(data[0].question);
		    	setEnteredAnswer(data[0].answer);
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
						<h3>ADD FAQs</h3>
				    </div>

				    <form onSubmit={ btn == 'submit' ? submitHandler : editHandler }>
				    	<div className="mb-3">
						  <label htmlFor="exampleFormControlInput1" className="form-label">Question</label>
						  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value={question} onChange={questionChangeHandler} />
						</div>
						<div className="mb-3">
						  <label htmlFor="exampleFormControlTextarea1" className="form-label">Answer</label>
						  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={answer} onChange={answerChangeHandler}></textarea>
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

export default AddFaq;