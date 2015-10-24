import {handler} from '../actions/AppActions';

export class Api{
	constructor(){
		this._chirps =[{
			cid:1,
			title:'Good Life',
			date: new Date()
		}];
	}
	fetchChirps(){
			 Promise.resolve(this._chirps).then(handler.gotChirps.bind(handler));
	}
}