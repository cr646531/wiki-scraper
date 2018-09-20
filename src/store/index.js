import { createStore, applyMiddleware, combineReducers } from 'redux';
import { LOAD_USERS, CREATE_USER, UPDATE_USER, DESTROY_USER } from './constants';
import thunk from 'redux-thunk';


const usersReducer = ( state = [], action)=> {
  switch(action.type){
    case LOAD_USERS:
      state = action.users;
      break;
    case CREATE_USER:
      state = [...state, action.user];
      break;
    case UPDATE_USER:
      state = [...state.map( user => user.id === action.user.id ? action.user : user )]
    case DESTROY_USER:
      state = state.filter(user => user.id !== action.user.id);
      break;
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer
});

export default createStore(reducer, applyMiddleware(thunk));
