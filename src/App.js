import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, loadUsers, destroyUser } from './store/actions';

class App extends Component{
  componentDidMount(){
    this.props.init();
  }
  render(){
    const { users, destroyUser, reset } = this.props;
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
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadUsers()),
    destroyUser: (user)=> dispatch(destroyUser(user)),
    reset: ()=> dispatch(reset())
  };
};

const mapStateToProps = ({ users })=> {
  return {
    users 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
