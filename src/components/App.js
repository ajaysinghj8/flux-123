import React from 'react';
import {RouteHandler,Link} from 'react-router';

export default class MainAppCmp extends React.Component {
	render() {
		return (<div className='container'>
					<div className='row'>
							<h1> Chirper </h1>
						</div>
						<div className='row'>
				  			 <div className='three columns'>
				 				  Navigation
								<Link to="users">Users </Link>			   
							 </div>
							 <div className='nine columns'>
				 				 <RouteHandler />
							 </div>	   
					</div>
			</div>);
	}
}