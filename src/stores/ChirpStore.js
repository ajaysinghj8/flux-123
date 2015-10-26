import {CONSTANTS} from '../constants/constants';
import Store from './Store';
import UserStore from './UserStore';
var userStore = new UserStore();

export default class ChirpStore extends Store{
	constructor(){
		super();
	}
	init(){
		this.bind(CONSTANTS.GOT_CHIRPS, this.set);
		this.bind(CONSTANTS.CHIRPED, this.add);
	}
	timeline(){
		var ids = [userStore.currentUser.userId].concat(userStore.currentUser.following);
		return this._data.filter(chirp=>ids.indexOf(chirp.userId)>-1).map(chirp=>{
			return this.populateUserInfo(chirp);
		});
	}
	populateUserInfo(chirp){
		chirp._user = userStore.get(chirp.userId);
		return chirp;
	}
}
