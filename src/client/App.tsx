import * as React from 'react';
import Footer from './components/footer'
import Navbar from './components/navbar'
import Register from './components/register'
import FoodImageHistory from './views/foodimagehistory'
import NoteHistory from './views/notehistory'
import JournalHistory from './views/journalhistory'
import HealthHistory from './views/healthhistory'
import Contact from './views/contact'
import Why from './views/why'
import Entries from './views/entries'
import Login from './components/login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  privateRoute  from './components/privateRoute'
import Input from './views/input'
import Home from './views/home';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/privateRoute';
import { TOKEN_KEY, apiService} from './front-utils/apiService'

/* HOOK REACT EXAMPLE https://images.freecreatives.com/wp-content/uploads/2015/03/Huge-Backgrounds-30.jpg */
const App = (props: AppProps) => {
	
	return (
		<>
		<div style={{ backgroundImage: "url(" + "https://images.freecreatives.com/wp-content/uploads/2016/02/Wood-Wall-Desktop-Background.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat' }} className="">
			<BrowserRouter>
				< Navbar />
				<div style={{ backgroundImage: "url(" + "https://images.freecreatives.com/wp-content/uploads/2016/02/Wood-Wall-Desktop-Background.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat' }} className="">
				<Switch>
				<Route exact path={'/register'}>
					<Register />
				</Route>
				<Route exact path={'/contact'}>
					<Contact />
				</Route>
				<Route exact path={'/entries'}>
					<Entries />
				</Route>
				<Route exact path={'/login'}>
					<Login />
				</Route>
				<PrivateRoute exact path={'/input'}>
					<Input />
				</PrivateRoute>
				<Route exact path={'/home'}>
					<Home />
				</Route>
				<Route exact path={'/foodimagehistory'}>
					<FoodImageHistory />
				</Route>
				<PrivateRoute exact path={'/notehistory'}>
					<NoteHistory />
				</PrivateRoute>
				<PrivateRoute exact path={'/journalhistory'}>
					<JournalHistory />
				</PrivateRoute>
				<PrivateRoute exact path={'/healthhistory'}>
					<HealthHistory />
				</PrivateRoute>
				<Route exact path={'/why'}>
					<Why />
				</Route>
				</Switch>
				</div>
				<Footer />
			</BrowserRouter>
			</div>
		</>
	);
};

interface AppProps {}

export default App;
