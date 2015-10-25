import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';

export default class ChirpApi{
	constructor(){
		this.incrementalId =1;
		this._chirps =[{
			cid:1,
			text:'Good Life',
			date: new Date()
		}];
	}
	fetch(){
			 Promise.resolve(this._chirps).then(ActionHandler.gotChirps.bind(ActionHandler));
	}
	save(chirp){
		var newChirp ={
			cid: ++this.incrementalId,
			text: chirp,
			date: new Date()
		}
		this._chirps.push(newChirp);
		Promise.resolve(newChirp).then(ActionHandler.chirped.bind(ActionHandler));
	}
}




let chirpApiInstance = new ChirpApi();
dispatcher.register(action=>{
	switch(action.actionType){
		case CONSTANTS.CHIRP :
			chirpApiInstance.save(action.data);
			break;			
	}
});