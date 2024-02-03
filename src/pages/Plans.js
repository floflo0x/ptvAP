import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Plans() {
	const [ plan, setPlan ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/getPlans.php`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data.length);
		   	setPlan(data);
		}

		fetchData();
	}, []);

	const deleteClickHandler = async(id) => {
		console.log(id);

		const formData = new FormData();
	    formData.append('id', id);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/deletePlan.php`, formData, {
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
					<div className="col-12 col-sm-12 col-md-12 text-center mb-5 border-0">
						<h3>PLANS</h3>
						<div className="border-0 text-end">
							<Link to="/addPlan" className="btn pt-2 pb-2 pe-4 ps-4 bg-dark text-white">Add Plans</Link>
						</div>
					</div>

					<table className="table table-hover table-borderless table-responsive">
						<thead className="table-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Name</th>
						      <th scope="col">Duration</th>
						      <th scope="col">Amount</th>
						      <th scope="col">More</th>
						    </tr>
  						</thead>
  						<tbody>
  							{plan && plan.map((i, index) => (
  								<tr key={index}>
							      <th scope="row">{i.id}</th>
							      <td>{i.name}</td>
							      <td>{i.duration}</td>
							      <td>{i.amount}</td>
							      <td> 
							      	<div className="d-flex align-items-center border-0 justify-content-evenly">
							      	<Link to={`/addPlan/?id=${i.id}`}>
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

				<div className="col-12 col-sm-12" style={{ height: '100px' }}></div>
			</div>
		</div>
	);
}

export default Plans;