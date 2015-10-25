import {CONSTANTS} from '../constants/constants';
import Store from './Store';
export default class ChirpStore extends Store{
	constructor(){
		super();
	}
	init(){
		this.bind(CONSTANTS.GOT_CHIRPS, this.set);
		this.bind(CONSTANTS.CHIRPED, this.add);
	}
}
