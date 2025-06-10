/**
* test scenario for isPreloadReducer
*
* - isPreloadReducer function
*  - should return the initial state when given by unknown action
*  - should return the isPreload when given by SET_IS_PRELOAD action
*
*/

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = true;
    const action = { type: 'AMBURADUL_ACTION' };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return the isPreload from payload when given SET_IS_PRELOAD action', () => {
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };
    const newState = isPreloadReducer(initialState, action);
    expect(newState).toEqual(action.payload.isPreload);
  });
});
