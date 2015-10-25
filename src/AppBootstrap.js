import React from 'react';
import ReactRouter from 'react-router';
import ChirpApi from './utils/chirpApi';
import MainAppCmp from './components/App';
import Home from './components/home'
import UserApi from './utils/userApi';
import UserList from './components/userList';

let chirpApi = new ChirpApi();
let userApi =new UserApi();
userApi.fetch();
chirpApi.fetch();

const {Route} = ReactRouter;
let routes = (<Route handler={ MainAppCmp } >
	<Route name='home' path= '/' handler= { Home } />
	<Route name='users' handler= { UserList } />
	<Route name='user' path= '/user/:id' handler= { Home } />

	</Route>);
ReactRouter.run(routes, ReactRouter.HistoryLocation, (Root) => {
	React.render(<Root />,document.body);
});
