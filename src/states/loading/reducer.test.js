/**
* test scenario for loadingReducer
*
* - loadingReducer function
*  - should return the initial state when given by unknown action
*  - should return true when given by SHOW_LOADING action
*  - should return false when given by HIDE_LOADING action
*
*/

import { describe, it, expect } from 'vitest';
import loadingReducer from './reducer';

describe('LoadingReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = false;
    const action = { type: 'AMBURADUL_ACTION' };
    const newState = loadingReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return true when given SHOW_LOADING action', () => {
    const initialState = false;
    const action = { type: 'SHOW_LOADING' };
    const newState = loadingReducer(initialState, action);
    expect(newState).toBe(true);
  });

  it('should return false when given HIDE_LOADING action', () => {
    const initialState = true;
    const action = { type: 'HIDE_LOADING' };
    const newState = loadingReducer(initialState, action);
    expect(newState).toBe(false);
  });
});