import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';
import {firebase} from './firebaseApi';

export default class UserApi {
	constructor() {
		firebase.onAuth(authData=> {
			if (authData)
				ActionHandler.signedinUser.call(ActionHandler, authData[authData.provider]);
			else
				setTimeout(() => {
					ActionHandler.signedoutUser.call(ActionHandler, {});
				}, 300);
		});
	}
	signin() {
		firebase.authWithOAuthPopup("google", ()=>{}, {
			remember: "sessionOnly",
			scope: "email"	
		});

	}
	signout() {
		firebase.unauth();
	}
}


let usersApiInstance = new UserApi();

dispatcher.register(action=> {
	switch (action.actionType) {
		case CONSTANTS.SIGNOUT_USER:
			usersApiInstance.signout();
			break;
		case CONSTANTS.SIGNIN_USER:
			usersApiInstance.signin();
			break;
	}
});