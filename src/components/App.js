import * as React from 'react';
import {RouteHandler} from 'react-router';

export let MainAppCmp= React.createClass({
	render: function() {
		return (<div className='container'>
					<div className='row'>
							<h1> Chirper </h1>
						</div>
						<div className='row'>
				  			 <div className='three columns'>
				 				  Navigation
							 </div>
							 <div className='nine columns'>
				 				 <RouteHandler />
							 </div>	   
					</div>
			</div>);
	}
});