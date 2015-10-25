import React from 'react';
import ChirpInput from './chirpinput';
import {ActionHandler} from '../actions/AppActions';
import ChirpStore from '../stores/ChirpStore';
import ChirpList from './chirpList';
let chirpStore = new ChirpStore();


export default class Chirp extends React.Component {
	state = {
		chirps: chirpStore.all()
	};
	componentDidMount() {
		chirpStore.addChangeListener(this.onChange);
	}
	onChange = () => {
		this.setState({
			chirps: chirpStore.all()
		});
	}
	componentWillUnmount() {
		chirpStore.removeChangeListener(this.onChange);
	}
	saveChirp = text => {
		var chirp = {
			text: text,
			userId: USER.userId, //TODO need to remove user from global scope
			created: +(new Date()),
			userInfo: USER
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

