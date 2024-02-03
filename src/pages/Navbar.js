import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import Cookies from 'js-cookie';

function Navbar() {
	const navigate = useNavigate();

	const logoutClickHandler = () => {
		Cookies.remove('isLoggedIn');
		navigate("/");
	}

	return(
		<div className="container-fluid nav__div">
			<div className="row">
				<div className="col-12 d-flex justify-content-between align-items-center">
		            <div>
		              <img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" className="nav__logo" />
		            </div>
		            <div className="border-0 bg-transparent nav__div2">
		                <Link to="/users" className="nav__link">Users</Link>
		                <Link to="/donations" className="nav__link">Donations</Link>
		                <Link to="/faq" className="nav__link">FAQ</Link>
		                <Link to="/plan" className="nav__link">Plans</Link>
		                <button className="nav__link border-0 bg-transparent" onClick={logoutClickHandler}>Logout</button>
		            </div>
            	</div>
          	</div>			
		</div>
	);
}

export default Navbar;