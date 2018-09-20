import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers } from './store/actions';

class App extends Component{
  componentDidMount(){
    this.props.init();
  }
  render(){
    const { users } = this.props;
    return (
      <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => <li key={ user.id }>{ user.name }</li>)
        }
      </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadUsers())
  };
};

const mapStateToProps = ({ users })=> {
  return {
    users 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
