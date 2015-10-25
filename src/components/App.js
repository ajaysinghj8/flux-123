import React from 'react';
import {RouteHandler,Link} from 'react-router';
import Login from './login';
import UserStore from '../stores/UserStore';


let userStoreInstance = new UserStore();

export default class MainAppCmp extends React.Component {
	state = { user : userStoreInstance.currentUser }
	componentWillUnmount() {
		userStoreInstance.removeChangeListener(this.onChange);
	}
	componentDidMount() {
		userStoreInstance.addChangeListener(this.onChange);
	}
	onChange=()=> {
		this.setState({
			user: userStoreInstance.currentUser
		});
	}
	render() {
		return (<div className='container'>
					<div className='row'>
							<h1> Chirper </h1>
						</div>
						<div className='row'>
				  			 <div className='three columns'>
				 				<Login user={this.state.user} />
								<Link to="users">Users </Link>			   
							 </div>
							 <div className='nine columns'>
				 				 <RouteHandler />
							 </div>	   
					</div>
			</div>);
	}
}