import React from 'react';
import ChirpInput from './chirpinput';
import {ActionHandler} from '../actions/AppActions';
import ChirpStore from '../stores/ChirpStore';
import ChirpList from './chirpList';
import UserStore from '../stores/UserStore';
let userStore = new UserStore();
let chirpStore = new ChirpStore();

export default class Chirp extends React.Component {
	state = {
		chirps: chirpStore.timeline()
	};
	componentDidMount() {
		chirpStore.addChangeListener(this.onChange);
	}
	onChange = () => {
		this.setState({
			chirps: chirpStore.timeline()
		});
	}
	componentWillUnmount() {
		chirpStore.removeChangeListener(this.onChange);
	}
	saveChirp = text => {
		if(!text && !userStore.currentUser.userId) return;
		var chirp = {
			text: text,
			userId: userStore.currentUser.userId,
			created: +(new Date())
		};
		ActionHandler.chirp(chirp);
	}
	render() {
		return (<div>
			<ChirpInput onSave={ this.saveChirp } />
			<ChirpList chirps={ this.state.chirps } />
			< /div>);
	}
}

