import React from 'react';
import UserStore from '../stores/UserStore';
import UserBox from './userBox';

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
		var listUsers = this.state.users.map(user=>(<UserBox key={ user.userId } user= { user } />));
	    return(<ul> { listUsers } < /ul>);
	}
}