import { LOAD_USERS, CREATE_USER, UPDATE_USER, DESTROY_USER } from './constants'
import axios from 'axios';

const _loadUsers = (users)=>({
  type: LOAD_USERS,
  users
});

const _updateUser = (user)=>({
  type: UPDATE_USER,
  user
});

const _createUser = (user)=>({
  type: CREATE_USER,
  user
});

const _destroyUser = (user)=>({
  type: DESTROY_USER,
  user
});

const destroyUser = (user)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}`)
      .then( response => response.data)
      .then( () => dispatch(_destroyUser(user))); 
  }
};

const createUser = (user)=> {

};
const updateUser = (user)=> {

};
const loadUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users')
      .then( response => response.data)
      .then( users => dispatch(_loadUsers(users))); 
  }
};

const reset = ()=> {
  return (dispatch)=> {
    return axios.post('/api/users/reset')
      .then( () => dispatch(loadUsers())); 
  }
};

export { reset, destroyUser, createUser, updateUser, loadUsers };
