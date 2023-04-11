import { configureStore } from '@reduxjs/toolkit';

interface UserState {
  authenticated: boolean;
  user: { [key: string]: any };
}

interface Action {
  type: string;
  payload?: UserState;
}

interface InitialState {
  authenticated: boolean;
  user: UserState;
}

const initialState: InitialState = {
    authenticated: false,
    user: { 
        authenticated: false, 
        user: {} 
    },
};

function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        ...state,
        authenticated: true,
        user: action.payload!,
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: { 
          authenticated: 
          false, 
          user: {} 
        },
      };
    default:
      return state;
  }
}

const store = configureStore({ reducer: authReducer });

export default store;
