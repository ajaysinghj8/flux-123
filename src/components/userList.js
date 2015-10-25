import React from 'react';
import UserStore from '../stores/UserStore';
import {ActionHandler} from '../actions/AppActions';
import {Link} from 'react-router';

let userStoreInstance = new UserStore();
export default class UserList extends React.Component {
	state = {
		users: userStoreInstance.all(),
		user: userStoreInstance.currentUser
	};
	componentDidMount() {
		userStoreInstance.addChangeListener(this.onChange);
	}
	onChange = () => {
		this.setState({
			users: userStoreInstance.all(),
			user: userStoreInstance.currentUser
		});
	}
	componentWillUnmount() {
		userStoreInstance.removeChangeListener(this.onChange);
	}
	render() {
		var listUsers =
			this.state.users
				.filter(user=> this.state.user.cid !== user.cid)
				.map(user=> {
					return (<li>@{ user.username } </li>);
				});
		return (<ul> { listUsers } < /ul>);

	}
}