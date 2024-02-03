import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Users() {
	const [ users, setUsers ] = useState([]);
	const [ offset, setOffset ] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`https://mateys.xyz/web_api/admin/getAdmin.php/?offset=${offset}`, {
		        headers: {
          			'accept': 'application/json', // Set the content type for FormData
        		},
		    });

		    const data = response.data;

		    // console.log(data.length);
		   	setUsers(data);
		}

		fetchData();
	}, [offset]);

	const handlePageClick = (newOffset) => {
    	setOffset(newOffset);
  	};

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<Navbar />

				<div className="col-12 col-sm-12 col-md-12 p-5 border-0" style={{ borderRadius: '10px' }}>
					<div className="col-12 col-sm-12 col-md-12 text-center mb-5">
						<h3>USERS</h3>
					</div>

					<table className="table table-hover table-borderless table-responsive">
						<thead className="table-dark">
						    <tr>
						      <th scope="col">#</th>
						      <th scope="col">Image</th>
						      <th scope="col">Name</th>
						      <th scope="col">Crypto</th>
						      <th scope="col">Twitter</th>
						      <th scope="col">Premium</th>
						    </tr>
  						</thead>
  						<tbody>
  							{users && users.map((i, index) => (
  								<tr key={index}>
							      <th scope="row">{i.id}</th>
							      <td>
							      	{i.image ? (
							      		<img src={`https://mateys.xyz/web_api/uploads/${i.image}`} alt="pirated tv" width="50" height="50" />
							        ) : (
							        	<div className="border" style={{ width: '50px', height: '50px' }}></div>
							        )}
							      </td>
							      <td>{i.username || "-"}</td>
							      <td>{i.wallet_address || "-"}</td>
							      <td>{i.twitter || "-"}</td>
							      <td>{i.isPremium || "no"}</td>
							    </tr>
							))}
                        </tbody>
					</table>
				</div>

				<div className="col-12 col-sm-12">
					<nav aria-label="Page navigation example">
			            <ul className="pagination justify-content-center">
			              <li className="page-item">
			                <button className="page-link" onClick={() => handlePageClick(offset - 10)} disabled={offset === 0}>
			                  Previous
			                </button>
			              </li>
			              <li className="page-item"><button className="page-link" onClick={() => handlePageClick(0)}>1</button></li>
			              <li className="page-item"><button className="page-link" onClick={() => handlePageClick(10)}>2</button></li>
			              <li className="page-item"><button className="page-link" onClick={() => handlePageClick(20)}>3</button></li>
			              <li className="page-item">
			                <button className="page-link" onClick={() => handlePageClick(offset + 10)}>
			                  Next
			                </button>
			              </li>
			            </ul>
			        </nav>
				</div>

				<div className="col-12 col-sm-12" style={{ height: '100px' }}></div>
			</div>
		</div>
	);
}

export default Users;