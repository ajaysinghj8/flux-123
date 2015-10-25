import React from 'react';
import ChirpInput from './chirpinput';
import {ActionHandler} from '../actions/AppActions';
import ChirpStore from '../stores/ChirpStore';
import ChirpList from './chirpList';
let chirpStore = new ChirpStore();


export default class Home extends React.Component {
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
		ActionHandler.chirp(text);
	}
	render() {
		return (<div>
			<ChirpInput onSave={ this.saveChirp } />
			<ChirpList chirps={ this.state.chirps } />
			< /div>);
	}
}

