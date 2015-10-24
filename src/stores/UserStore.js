import {CONSTANTS} from '../constants/constants';
import {Store} from './Store';

export class UserStore extends Store {
	constructor() {
		super();
		this.currentUser = window.USER;
	}
	init() {
		this.bind(CONSTANTS.GOT_USERS, this.set);
		this.bind(CONSTANTS.FOLLOWED, this.updateUser);
		this.bind(CONSTANTS.UNFOLLOWED, this.updateUser);
	}
	updateUser(data) {
		this.currentUser = data;
	}

}
