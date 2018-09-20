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

const destroyUser = (user)=> {};
const createUser = (user)=> {};
const updateUser = (user)=> {};
const loadUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users')
      .then( response => response.data)
      .then( users => dispatch(_loadUsers(users))); 
  }
};

export { detroyUser, createUser, updateUser, loadUsers };
