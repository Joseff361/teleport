import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import { ChatMember, TeleportMessage } from '../models';

type ModalSate = 'success' | 'error';

interface State {
  credentials: UserCredential | null;
  messages: TeleportMessage[];
  members: ChatMember[];
  modal: {
    isOpen: boolean;
    message: string;
    state: ModalSate;
  };
}

// Define the initial state using that type
const initialState: State = {
  credentials: null,
  messages: [],
  members: [],
  modal: {
    isOpen: false,
    message: '',
    state: 'success',
  },
};

export const sessionSlice = createSlice({
  name: 'session',
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
    setMembers: (state, action: PayloadAction<ChatMember[]>) => {
      state.members = action.payload;
    },
    openModal: (
      state,
      action: PayloadAction<{ message: string; state: ModalSate }>,
    ) => {
      state.modal = {
        isOpen: true,
        message: action.payload.message,
        state: action.payload.state,
      };
    },
    closeModal: state => {
      state.modal = {
        isOpen: false,
        message: '',
        state: 'success',
      };
    },
  },
});

export const sessionActions = sessionSlice.actions;

export default sessionSlice.reducer;
