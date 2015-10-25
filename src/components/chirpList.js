import React from 'react';
import ChirpBox from './chirpBox';

export default class ChirpList extends React.Components{	
	  render(){
		var listItems = this.props.chirps.map(function(chirp){
			return <ChirpBox key={ chirp.cid } chirp={chirp} />;
		});
		return (<ul> {listItems} </ul>);
	}
}