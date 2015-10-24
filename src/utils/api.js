import {handler} from '../actions/AppActions';

export class Api{
	constructor(){
		this._chirps =[{
			cid:1
		}];
	}
	fetchChirps(){
			 Promise.resolve(this._chirps).then(handler.gotChirps.bind(handler));
	}
}