import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';
import {firebase, UsersDb} from './firebaseApi';
import ChirpApi from './chirpApi';

export default class UserApi {
	constructor() {
	}
	unBindFireBase(){
		UsersDb.off('value');
	}
	bindFireBase(){
		firebase.onAuth(authData=> {
			var chirpApiInstance = new ChirpApi();
			if (authData){
				console.log('here it is got called');
			   ActionHandler.signedinUser.call(ActionHandler,this.tranformAuthData(authData));
			   chirpApiInstance.bindFireBase();
				UsersDb.on('value',snapshot=>{
					setTimeout(() => {
				 		ActionHandler.gotUsers.call(ActionHandler,this.toArray(snapshot));	
					},100);
				});   	   
			}
			else{
				console.log('un here it is got called');
				setTimeout(() => {
					ActionHandler.signedoutUser.call(ActionHandler, {});
				}, 300);
				this.unBindFireBase();
			    chirpApiInstance.unBindFireBase();
			}
		});	
	}
	fetch() {
		// UsersDb.once('value', snapshot => {
		// 	setTimeout(() => {
		// 		ActionHandler.gotUsers.call(ActionHandler,this.toArray(snapshot));
		// 	},100);
		// });
	}
	toObject(snapshot){
		var vals = snapshot.val();
		vals.cid = snapshot.key();
		return vals;
	}
	toArray(snapshot){
		var array =[];
		snapshot.forEach(snap=>{
			var vals = this.toObject(snap);
			array.push(vals);
		});
		return array; 
	}
	tranformAuthData(authData) {
		var profileInfo = authData[authData.provider].cachedUserProfile;
				var user= {userId: authData.uid,
					name: profileInfo.name,
					email: profileInfo.email,
					picture: profileInfo.picture};
	  return user;
	}
	signin() {
		firebase.authWithOAuthPopup("google", (error, authData) => {
			if (error) return;
			UsersDb.child(authData.uid).once('value', (snapshot) => {
				if (!snapshot.exists()){
					UsersDb.child(authData.uid).set(this.tranformAuthData(authData));	
				}
			});
		}, {
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