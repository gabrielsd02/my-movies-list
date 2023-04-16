import { 
    configureStore, 
    createAction, 
    createSlice 
} from '@reduxjs/toolkit';

import {
    UserState
} from './interfaceStore';

const initialState: UserState = {
    authenticated: false,
    user: ''
};

export const logout = createAction('LOGOUT');

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
