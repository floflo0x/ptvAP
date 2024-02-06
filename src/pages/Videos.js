import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Videos() {
	const [ video, setVideo ] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/getVideos.php`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data);
		   	setVideo(data);
		}

		fetchData();
	}, []);

	const deleteClickHandler = async (id) => {
		// console.log(id);

		const formData = new FormData();
	    formData.append('id', id);

		const response = await axios.post(`https://mateys.xyz/web_api/admin/deleteVideo.php`, formData, {
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
						<h3>USERS</h3>
						<div className="border-0 text-end">
							<Link to="/addFaq" className="btn pt-2 pb-2 pe-4 ps-4 bg-dark text-white">Add Videos</Link>
						</div>
					</div>

					<table className="table table-hover table-borderless table-responsive">
						<thead className="table-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Name</th>
						      <th scope="col">Video</th>
						      <th scope="col">Skip Duration</th>
						      <th scope="col">More</th>
						    </tr>
  						</thead>

  						<tbody>
  							{video && video.map((i, index) => (
  								<tr key={index}>
							      <th scope="row">{i.id}</th>
							      <td>{i.name}</td>
							      <td>
							      	<video width="320" height="200" controls>
									  <source src={i.video} type="video/mp4" />
									</video>
							      </td>
							      <td>{i.skip_duration}</td>
							      <td> 
							      	<div className="d-flex align-items-center border-0 justify-content-evenly">
							      	<Link to="#">
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
			</div>
		</div>
	);
}

export default Videos;