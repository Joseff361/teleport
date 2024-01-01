import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import { TeleportMessage } from '../models';

interface AuthState {
  credentials: UserCredential | null;
  messages: TeleportMessage[];
}

// Define the initial state using that type
const initialState: AuthState = {
  credentials: null,
  messages: [],
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      const credentials = JSON.parse(action.payload) as UserCredential;
      state.credentials = credentials;
    },
    removeCredentials: state => {
      state.credentials = null;
    },
    setMessages: (state, action: PayloadAction<TeleportMessage[]>) => {
      state.messages = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
