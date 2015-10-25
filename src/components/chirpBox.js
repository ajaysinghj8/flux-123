import React from 'react';
import {Link} from 'react-router';
import {avatar} from '../utils/utils';
import Moment from 'moment';
import UserStore from '../stores/UserStore';

let userStore = new UserStore();

export default class ChirpBox extends React.Component{
  render() {
    var c = this.props.chirp;
    var user = userStore.get(c.userId);
    if(!user) return (<p>Loading ...</p>);
    return (<li className= 'row chirp'>
       <Link className='two columns' to='user' params={{id:user.cid}}>
         <img src={ user.picture } />
       </Link>
       <div className='ten columns'>
            <p>
               <strong>{c.name}</strong>
               <span className='timestamp'>
                @{Moment(c.created).fromNow()}
               </span>
            </p>
            <p>
               <p> {c.text} </p>
            </p>
            
       </div>
    < /li>);
  }

}
