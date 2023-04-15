import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';

import {
    Action,
    UserState
} from './interfaceStore';

const initialState: UserState = {
    authenticated: false,
    user: ''
};

export const logout = createAction('LOGOUT');

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
				user: '',
			};
		default:
		return state;
  	}
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state: UserState, action: { payload: UserState }) => {

            state.authenticated = action.payload.authenticated;
            state.user = action.payload.user;

        },
        setSignOut: (state) => {
			
            state.user = '';
            state.authenticated = false;

        }
    }
});

export const { setSignIn, setSignOut } = authSlice.actions;

const store = configureStore({ reducer: authSlice.reducer });

export default store;
