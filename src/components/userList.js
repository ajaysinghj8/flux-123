import * as React from 'react';
import {UserStore} from '../stores/UserStore';
import {ActionHandler} from '../actions/AppActions';
import {Link} from 'react-router';

let userStoreInstance = new UserStore();
export let UserList = React.createClass({
	getInitialState: function () {
		return {
			users: userStoreInstance.all(),
			user: userStoreInstance.currentUser
		};
	},
	componentDidMount: function () {
		userStoreInstance.addChangeListener(this.onChange);
	},
	onChange: function () {
		this.setState({
			chirps: userStoreInstance.all()
		});
	},
	componentWillUnmount: function () {
		userStoreInstance.removeChangeListener(this.onChange);
	},
	render: function () {
		var listUsers =
			this.state.users
				.filter(user=> this.state.user.cid !== user.cid)
				.map(user=> {
					return (<li>@{ user.username } </li>);
				});
		return (<ul> { listUsers } < /ul>);

	}
});