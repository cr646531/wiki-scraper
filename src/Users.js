import React from 'react';
import { connect } from 'react-redux';
import { reset, destroyUser } from './store';

const Users = ({ users, destroyUser, reset})=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ reset }>Reset</button>
      <ul>
        {
          users.map( user => <li onClick={()=> destroyUser(user)} key={ user.id }>{ user.name }</li>)
        }
      </ul>
    </div>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    destroyUser: (user)=> dispatch(destroyUser(user)),
    reset: ()=> dispatch(reset())
  };
};

const mapStateToProps = ({ users })=> {
  return {
    users 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
