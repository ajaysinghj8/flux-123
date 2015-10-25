import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';

export default class UserApi {
	constructor() {
		this._data = [
			{ cid: 1, fullname: 'Ajay Singh', username: 'plutazoo' },
			{ cid: 2, fullname: 'xyz abc', username: 'ss' },
			{ cid: 3, fullname: 'info', username: 'info' }
		];
	}
	fetch() {
		Promise.resolve(this._data).then(ActionHandler.gotUsers.bind(ActionHandler));
	}

}

let usersApiInstance = new UserApi();

dispatcher.register(action=> {
	switch (action.actionType) {
	}
});