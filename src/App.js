import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Donations from './pages/Donations';
import Faq from './pages/Faq';
import AddFaq from './pages/AddFaq';
import UsersDonation from './pages/UsersDonation';
import Protected from './pages/Protected';
import Plans from './pages/Plans';
import AddPlan from './pages/AddPlan';
import Videos from './pages/Videos';

const App = () => {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<Login />}></Route>
				<Route exact path="/users" element={<Protected Component={Users} />}></Route>
				<Route exact path="/donations" element={<Protected Component={Donations} />}></Route>
				<Route exact path="/faq" element={<Protected Component={Faq} />}></Route>
				<Route exact path="/addFaq/*" element={<Protected Component={AddFaq} />}></Route>
				<Route exact path="/plan" element={<Protected Component={Plans} />}></Route>
				<Route exact path="/userDonation/*" element={<Protected Component={UsersDonation} />}></Route>
				<Route exact path="/videos" element={<Protected Component={Videos} />}></Route>
				<Route exact path="/addPlan/*" element={<Protected Component={AddPlan} />}></Route>
			</Routes>
		</div>
	);
}

export default App;