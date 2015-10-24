import * as React from 'react';
import {Link} from 'react-router';
import {avatar} from '../utils/utils';
import * as Moment from 'moment';

export let ChirpBox = React.createClass({
  render: function () {
    var c = this.props.chirp;
    return (<li className= 'row chirp' >
       <Link className='two columns' to='user' params={{id:10}}>
         <img src={ avatar('ajay@srijan.in') } />
       </Link>
       <div className='ten columns'>
            <p>
               <strong>Ajay Singh </strong>
               <span className='timestamp'>
                @{'plutazoo'} {Moment.default(c.date).fromNow()}
               </span>
            </p>
            <p>
               <p> {c.text} </p>
            </p>
            
       </div>
    < /li>);
  }

});
