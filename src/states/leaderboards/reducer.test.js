/**
* test scenario for leaderboardsReducer
*
* - leaderboardsReducer function
*  - should return the initial state when given by unknown action
*  - should return the leaderboards when given by SET_LEADERBOARDS action
*
*/

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'AMBURADUL_ACTION' };
    const newState = leaderboardsReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return the leaderboards from payload when given SET_LEADERBOARDS action', () => {
    const initialState = [];
    const action = {
      type: 'SET_LEADERBOARDS',
      payload: {
        leaderboards: [{
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          score: 10
        }]
      },
    };
    const newState = leaderboardsReducer(initialState, action);
    expect(newState).toEqual(action.payload.leaderboards);
  });
});
