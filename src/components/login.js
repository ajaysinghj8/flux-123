import React from 'react';
import {ActionHandler} from '../actions/AppActions';

export default class Login extends React.Component {
	render() {
		if (this.props.user.email)
			return (<div className='row' >
				<p> Hi!, {this.props.user.displayName } </p>
				< p > <button onClick={ this.signout }> Logout < /button> </p >
				</div>);
		return (<div className='row' >
			<p> <button onClick={ this.signin }> Sign In < /button> </p >
			</div>);
		 
	}
	signout = (evt) => {
		ActionHandler.signoutUser();
	}
	signin = (evt) => {
		ActionHandler.signinUser();
	}
}
