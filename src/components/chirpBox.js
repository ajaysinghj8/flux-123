import React from 'react';
import {Link} from 'react-router';
import {avatar} from '../utils/utils';
import Moment from 'moment';

export default class ChirpBox extends React.Component{
  render() {
    var c = this.props.chirp;
    return (<li className= 'row chirp' >
       <Link className='two columns' to='user' params={{id:10}}>
         <img src={ avatar('ajay@srijan.in') } />
       </Link>
       <div className='ten columns'>
            <p>
               <strong>Ajay Singh </strong>
               <span className='timestamp'>
                @{'plutazoo'} {Moment(c.date).fromNow()}
               </span>
            </p>
            <p>
               <p> {c.text} </p>
            </p>
            
       </div>
    < /li>);
  }

}
