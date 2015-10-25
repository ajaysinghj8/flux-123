import {EventEmitter} from 'events';
import {dispatcher} from '../dispatcher/dispatcher';


const CHANGE_EVENT = 'CHANGED';

export default class Store extends EventEmitter {
	constructor() {
		super();
		this.actions = {};
		this._data = [];
		this.init();
		dispatcher.register(action => {
			if (this.actions[action.actionType]) {
				this.actions[action.actionType].forEach((fn) => {
					fn.call(this, action.data);
					this.emitChange();
				});
			}
		});

	}
	init() {
		
	}
	set(arr) {
		var currIds = this._data.map(m => m.cid);
		arr.filter(item => currIds.indexOf(item.cid) === -1).forEach(this.add.bind(this));
	}
	add(item) {
		this._data.push(item);
	}
	all() {
		return this._data;
	}
	get(id) {
		return this._data.filter(item => item.cid === id)[0];
	}
	addChangeListener(fn) {
		this.on(CHANGE_EVENT, fn);
	}
	removeChangeListener(fn) {
		this.removeListener(CHANGE_EVENT, fn);
	}
	emitChange() {
		this.emit(CHANGE_EVENT);
	}
	bind(actionType, actionFn) {
		if (this.actions[actionType] === undefined || this.actions[actionType] === null) {
			this.actions[actionType] = [actionFn];
		} else {
			this.actions[actionType].push(actionFn);
		}
	}
};

	
	