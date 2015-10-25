import  {Dispatcher} from 'flux';
export var dispatcher = new Dispatcher();


dispatcher.register(action=>{
	console.log(action);
});