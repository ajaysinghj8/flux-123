import {CONSTANTS} from '../constants/constants';
import {Store} from './AppStore';
export class ChirpStore extends Store{
	constructor(){
		super();
	}
	init(){
		this.bind(CONSTANTS.GOT_CHIRPS, this.set.bind(this));
		this.bind(CONSTANTS.CHIRPED, this.add.bind(this));
	}
}
