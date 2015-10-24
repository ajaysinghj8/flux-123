import * as React from 'react';
import * as ReactRouter from 'react-router';
import {ChirpStore} from './stores/ChirpStore';
import {Api} from './utils/api';
import {MainAppCmp} from './components/App';
import {Home} from './components/home'
let api = new Api();
api.fetchChirps();
let chirps = new ChirpStore();

let Route = ReactRouter.Route;
let routes = (<Route handler={ MainAppCmp } >
	<Route name='home' path= '/' handler= { Home } />
	</Route>);
ReactRouter.run(routes, ReactRouter.HistoryLocation, (Root) => {
	React.render(<Root />,document.body);
});
