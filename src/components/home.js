import * as React from 'react';
import {ChirpInput} from './chirpinput';
import {ActionHandler} from '../actions/AppActions';

export let Home = React.createClass({
	render: function() {
		return (<div>
			<ChirpInput onSave={ this.saveChirp } />
			</div>);
	},
	saveChirp: function(text) {
		ActionHandler.chirp(text);
	}
});

