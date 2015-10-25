import React from 'react';


export default class ChirpInput extends React.Components {
	state = { value: '' }
	handleChange = evt => {
		this.setState({
			value: evt.target.value
		});
	}
	handleClick =evt => {
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	}
	render() {
		return (<div className='row' >
			<div className='nine columns' >
			<input 
				    className='u-full-width'
		type = 'text'
		placeholder = 'write'
		value = { this.state.value }
		onChange = { this.handleChange } />
		</div>
		< div className= 'three columns' >
		<button 
				     className='u-full-width button-primary'
		onClick = { this.handleClick } >
		Chirp
		< /button>

		< /div>
		< /div>);
	}

}