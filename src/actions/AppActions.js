import {dispatcher} from '../dispatcher/dispatcher';
import {CONSTANTS}  from '../constants/constants';

export let handler={};
for (let key in CONSTANTS) {
  let funcName = key.split('_').map((word, i) => { if (i === 0) { return word.toLowerCase(); } return word[0] + word.slice(1).toLowerCase(); }).join('');
  handler[funcName]= ((data)=>{
    dispatcher.dispatch({
      actionType:CONSTANTS[key],
      data:data
    });
  });
}

