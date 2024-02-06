import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function AddVideos() {
	const navigate = useNavigate();

	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
  	let id = queryParams.get('id') || '';

  	return (
  		<div className="container-fluid mt-5 p-3">
			<div className="row">
				<Navbar />

				<div 
					className="col-12 col-sm-12 col-md-12 mt-5 border" 
					style={{ borderRadius: '10px' }}
				>
				</div>
			</div>
		</div>
  	);
}

export default AddVideos;