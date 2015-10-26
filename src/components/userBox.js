import React from 'react';
import {Link} from 'react-router';
import Moment from 'moment';
import FollowButton from './followButton';

export default class UserBox extends React.Component{
  render() {
    var u = this.props.user;
    return (<li className= 'row chirp'>
       <Link className='two columns' to='user' params={{id:u.cid}}>
         <img src={ u.picture } />
       </Link>
       <div className='ten columns'>
            <p>
               <strong>{u.name}</strong>
            </p>
            <p>
              <FollowButton userId={u.userId}/>             
            </p>
            
       </div>
    < /li>);
  }
}
