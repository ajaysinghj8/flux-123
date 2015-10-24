import * as React from 'react';
import {ChirpBox} from './chirpBox';

export let ChirpList = React.createClass({
	render:function(){
		var listItems = this.props.chirps.map(function(chirp){
			return <ChirpBox key={ chirp.cid } chirp={chirp} />;
		});
		return (<ul> {listItems} </ul>);
	}
});