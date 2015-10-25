import React from 'react';
import ReactRouter from 'react-router';
import ChirpApi from './utils/chirpApi';
import MainAppCmp from './components/App';
import Chirp from './components/chirp'
import UserApi from './utils/userApi';
import UserList from './components/userList';

let chirpApi = new ChirpApi();
let userApi =new UserApi();
userApi.fetch();
chirpApi.fetch();

const {Route} = ReactRouter;
let routes = (<Route handler={ MainAppCmp } >
	<Route name='home' path= '/' handler= { Chirp } />
	<Route name='users' handler= { UserList } />
	<Route name='user' path= '/user/:id' handler= { Chirp } />

	</Route>);
ReactRouter.run(routes, ReactRouter.HistoryLocation, (Root) => {
	React.render(<Root />,document.body);
});
