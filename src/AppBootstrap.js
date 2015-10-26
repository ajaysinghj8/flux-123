import React from 'react';
import ReactRouter from 'react-router';
import MainAppCmp from './components/App';
import Chirp from './components/chirp'
import UserList from './components/userList';
import {usersApiInstance} from './utils/userApi';

const {Route} = ReactRouter;
let routes = (<Route handler={ MainAppCmp } >
	<Route name='home' path= '/' handler= { Chirp } />
	<Route name='users' handler= { UserList } />
	<Route name='user' path= '/user/:id' handler= { Chirp } />

	</Route>);
ReactRouter.run(routes, ReactRouter.HistoryLocation, (Root) => {
	React.render(<Root />,document.body);
});
