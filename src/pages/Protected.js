import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Protected(props) {
	const { Component } = props;
	const navigate = useNavigate();

	useEffect(() => {
		const isLoggedIn = Cookies.get('logIn');

		// console.log(isLoggedIn);

		if (isLoggedIn == undefined) {
			navigate('/');
		}
		else {}
	}, [])

	return (
		<div>
			<Component />
		</div>
	);
}

export default Protected;