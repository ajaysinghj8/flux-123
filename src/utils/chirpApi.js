import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';
import {ChirpDb} from './firebaseApi';
export default class ChirpApi {
	constructor() {
	}
	unBindFireBase(){
		ChirpDb.off('value');
	}
	bindFireBase(){
		ChirpDb.on('value',snapshot=>{
			setTimeout(() => {
				  ActionHandler.gotChirps.call(ActionHandler,this.toArray(snapshot));
			  }, 100);
		});
	}
	toArray(snapshot) {
		var array = [];
		snapshot.forEach(snap=> {
			var vals = this.toObject(snap);
			array.push(vals);
		});
		return array;
	}
	fetch() {
		// ChirpDb.once('value', snapshot => {
		// 	setTimeout(() => {
		// 		ActionHandler.gotChirps.call(ActionHandler, this.toArray(snapshot));
		// 	}, 100);

		// });
	}
	toObject(snapshot){
		var vals = snapshot.val();
		vals.cid = snapshot.key();
		return vals;
	}
	save(chirp) {
		ChirpDb.push(chirp);
	}
}




let chirpApiInstance = new ChirpApi();
dispatcher.register(action=> {
	switch (action.actionType) {
		case CONSTANTS.CHIRP:
			chirpApiInstance.save(action.data);
			break;
	}
});