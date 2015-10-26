import React from 'react';
import {Link} from 'react-router';
import Moment from 'moment';

export default class ChirpBox extends React.Component{
  render() {
    var c = this.props.chirp;
    return (<li className= 'row chirp'>
       <Link className='two columns' to='user' params={{id:c.userId}}>
         <img src={ c._user.picture } />
       </Link>
       <div className='ten columns'>
            <p>
               <strong>{c._user.name}</strong>
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
