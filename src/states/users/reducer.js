import { ActionType } from './action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.SET_USERS:
    return action.payload.users;
  default:
    return users;
  }
}

export default usersReducer;