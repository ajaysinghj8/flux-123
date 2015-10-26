import {ActionHandler} from '../actions/AppActions';
import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS} from '../constants/constants';
import {firebase, UsersDb} from './firebaseApi';
import {chirpApiInstance} from './chirpApi';

class UserApi {
	constructor() {
		this.bindFireBase();
	}
	unBindFireBase() {
		UsersDb.off('value');
	}
	bindFireBase() {
		firebase.onAuth(authData=> {
			if (authData) {
				this.fetchUser(authData.uid);
				UsersDb.on('value', snapshot=> {
					setTimeout(() => {
						ActionHandler.gotUsers.call(ActionHandler, this.toArray(snapshot));
					});
				});
				chirpApiInstance.bindFireBase();

			}
			else {
				setTimeout(() => {
					ActionHandler.signedoutUser.call(ActionHandler, {});
				}, 100);
				this.unBindFireBase();
				chirpApiInstance.unBindFireBase();
			}
		});
	}
	fetchUser(userId) {
		UsersDb.child(userId).once('value', snapshot => {
			if (!snapshot.exists()) return;
			ActionHandler.signedinUser.call(ActionHandler, this.toObject(snapshot));
		});
	}
	toObject(snapshot) {
		var vals = snapshot.val();
		vals.cid = snapshot.key();
		if (!vals.following) vals.following = [];
		return vals;
	}
	toArray(snapshot) {
		var array = [];
		snapshot.forEach(snap=> {
			var vals = this.toObject(snap);
			array.push(vals);
		});
		return array;
	}
	tranformAuthData(authData) {
		var profileInfo = authData[authData.provider].cachedUserProfile;
		var user = {
			userId: authData.uid,
			name: profileInfo.name,
			email: profileInfo.email,
			picture: profileInfo.picture,
			following: []
		};
		return user;
	}
	signin() {
		firebase.authWithOAuthPopup("google", (error, authData) => {
			if (error) return;
			UsersDb.child(authData.uid).once('value', (snapshot) => {
				if (!snapshot.exists()) {
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
	followUser(data) {
		if (!data.currentUserId&&!data.followId) return;
		UsersDb.child(data.currentUserId).once('value', snapshot => {
			if (!snapshot.exists()) return;
			var _user = this.toObject(snapshot);
			if (_user.following) _user.following.push(data.followId);
			else _user.following = [data.followId];
			delete _user.cid;
			UsersDb.child(_user.userId).set(_user, error=> { this.fetchUser(_user.userId); });
		});
	}
	unFollowUser(data) {
		if (!data.currentUserId&&!data.unFollowId) return;
		UsersDb.child(data.currentUserId).once('value', snapshot => {
			if (!snapshot.exists()) return;
			var _user = this.toObject(snapshot);
			if (!_user.following) return;
			var pos = _user.following.indexOf(data.unFollowId);
			_user.following.splice(pos, 1);
			delete _user.cid;
			UsersDb.child(_user.userId).set(_user, error=> { this.fetchUser(_user.userId); });
		});
	}
}


export let usersApiInstance = new UserApi();

dispatcher.register(action=> {
	switch (action.actionType) {
		case CONSTANTS.SIGNOUT_USER:
			usersApiInstance.signout();
			break;
		case CONSTANTS.SIGNIN_USER:
			usersApiInstance.signin();
			break;
		case CONSTANTS.FOLLOW:
			usersApiInstance.followUser(action.data);
			break;
		case CONSTANTS.UNFOLLOW:
			usersApiInstance.unFollowUser(action.data);
	}
});