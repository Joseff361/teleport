import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';

interface AuthState {
  user: UserCredential | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      const credentials = JSON.parse(action.payload) as UserCredential;
      state.user = credentials;
    },
    removeCredentials: state => {
      state.user = null;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
