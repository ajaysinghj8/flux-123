import React from 'react';
import {ActionHandler} from '../actions/AppActions';
import UserStore from '../stores/UserStore';
let userStoreInstance = new UserStore();
export default class FollowButton extends React.Component {
   state = {
		id: userStoreInstance.currentUser.userId,
		currentlyFollowing: userStoreInstance.currentUser.following
	};
	componentDidMount() {
		userStoreInstance.addChangeListener(this.onChange);
	}
	onChange = () => {
		this.setState({
			id: userStoreInstance.currentUser.userId,
			currentlyFollowing: userStoreInstance.currentUser.following
		});
		this.render();
	}
	componentWillUnmount() {
		userStoreInstance.removeChangeListener(this.onChange);
	}
	unFollow = (evt) => {
		ActionHandler.unfollow.call(ActionHandler, {currentUserId:this.state.id,unFollowId:this.props.userId});
	}
	follow = (evt) => {
		ActionHandler.follow.call(ActionHandler, {currentUserId:this.state.id,followId:this.props.userId});
	}
	render() {
		if (this.state.id === this.props.userId) return (<span> This is You ! </span>);
		var text, action;
		if (this.state.currentlyFollowing.indexOf(this.props.userId) > -1) {
			text = 'Unfollow';
			action = 'unFollow';
		} else {
			text = 'Follow';
			action = 'follow';
		}

		return (<button onClick={ this[action] } > { text } < /button> );

	}

}