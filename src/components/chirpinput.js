import * as React from 'react';


export let ChirpInput = React.createClass({
	getInitialState:function(){
		return{
		  value:''	
		};
	},
	handleChange:function(evt){
		this.setState({
			value:evt.target.value
		});
	},
	handleClick:function(evt){
		this.props.onSave(this.state.value);
		this.setState({
			value:''
		});
	},
	render:function(){
		return (<div className='row'>
			    <div className='nine columns'>
				  <input 
				    className='u-full-width'
					type='text'
					placeholder='write'
					value={this.state.value}
					onChange={this.handleChange} />
				</div>
				<div className='three columns'>
				  <button 
				     className='u-full-width button-primary'
					 onClick={this.handleClick}>
					 Chirp
				</button>	 
					 
				</div>
		  </div>);
	}
	
});