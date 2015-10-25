import {CONSTANTS} from '../constants/constants';
import Store from './Store';

export default class UserStore extends Store {
	constructor() {
		super();
		this.currentUser = {};
	}
	init() {
		this.bind(CONSTANTS.GOT_USERS, this.set);
		this.bind(CONSTANTS.FOLLOWED, this.updateUser);
		this.bind(CONSTANTS.UNFOLLOWED, this.updateUser);
		this.bind(CONSTANTS.SIGNEDIN_USER, this.updateUser);
		this.bind(CONSTANTS.SIGNEDOUT_USER, this.updateUser);
	}
	updateUser(data) {
		this.currentUser = data;
		window.USER = data;//TODO need to remove user from global scope
	}

}
