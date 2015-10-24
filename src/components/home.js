import * as React from 'react';
import {ChirpInput} from './chirpinput';
import {ActionHandler} from '../actions/AppActions';
import {ChirpStore} from '../stores/ChirpStore';
import {ChirpList} from './chirpList';
let chirpStore = new ChirpStore();
export let Home = React.createClass({
	getInitialState: function () {
		return {
			chirps: chirpStore.all()
		};
	},
	componentDidMount: function () {
		chirpStore.addChangeListener(this.onChange);
	},
	onChange: function () {
		this.setState({
			chirps: chirpStore.all()
		});
	},
	componentWillUnmount: function () {
		chirpStore.removeChangeListener(this.onChange);
	},
	saveChirp: function (text) {
		ActionHandler.chirp(text);
	},
	render: function () {
		return (<div>
			<ChirpInput onSave={ this.saveChirp } />
			<ChirpList chirps={ this.state.chirps } />
			< /div>);
	}
});

