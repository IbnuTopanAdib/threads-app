const ActionType = {
  SET_USERS: 'SET_USERS',
};

function setUsersActionCreator(users) {
  return {
    type: ActionType.SET_USERS,
    payload: {
      users,
    },
  };
}

export {
  ActionType,
  setUsersActionCreator
};