import {React} from 'react';
import {dispatcher} from './dispatcher/dispatcher';
import {handler} from './actions/AppActions';
import {ChirpStore} from './stores/ChirpStore';
import {Api} from './utils/api';
var api = new Api();
console.log(api.fetchChirps());
var chirps = new ChirpStore();
console.log(chirps);