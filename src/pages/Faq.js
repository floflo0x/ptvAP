import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Donations() {
	const [ faqs, setFaqs ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/getFaq.php`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data);
		   	setFaqs(data);
		}

		fetchData();
	}, []);

	const deleteClickHandler = async(id) => {
		console.log(id);

		const formData = new FormData();
	    formData.append('id', id);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/deleteFaq.php`, formData, {
		    headers: {
          		'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
		});

		// console.log(response);
		window.location.reload();
	}

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<Navbar />

				<div className="col-12 col-sm-12 col-md-12 p-5 border-0" style={{ borderRadius: '10px' }}>
					<div className="col-12 col-sm-12 col-md-12 text-center mb-5">
						<h3>FAQs</h3>
					</div>

					<table className="table table-hover table-borderless table-responsive">
						<thead className="table-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Question</th>
						      <th scope="col">Answer</th>
						      <th scope="col">More</th>
						    </tr>
  						</thead>
  						<tbody>
  							{faqs && faqs.map((i, index) => (
  								<tr key={index}>
							      <th scope="row">{i.id}</th>
							      <td>{i.question}</td>
							      <td>{i.answer}</td>
							      <td> 
							      	<div className="d-flex align-items-center border-0 justify-content-evenly">
							      	<Link to={`/addFaq/?id=${i.id}`}>
							      		<i className="fa-solid fa-pen-to-square" style={{ color: '#06cb13' }}></i>
							      	</Link>
							      	<button className="btn border-0 bg-transparent" onClick={() => deleteClickHandler(i.id)}>
							      		<i className="fa-solid fa-trash-can" style={{ color: '#eb0510' }}></i>
							      	</button>
							      	</div>
							      </td>
							    </tr>
  							))}
                        </tbody>
					</table>
				</div>

				<div className="col-12 col-sm-12"></div>
			</div>
		</div>
	);
}

export default Donations;