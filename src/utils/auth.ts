import { UserCredential } from 'firebase/auth';
import { redirect } from 'react-router-dom';

import { ChatMember, TeleportMessage } from '../models';
import { store } from '../store';
import { authSliceActions } from '../store/authSlice';

const localStorageKey = 'teleport-user-credentials';

export const fetchCredentials = () => {
  const credentials = localStorage.getItem(localStorageKey);

  if (credentials) {
    store.dispatch(authSliceActions.setAuth(credentials));
  }

  return null;
};

export const saveCredentials = (response: UserCredential) => {
  const stringifiedCredentials = JSON.stringify(response);
  localStorage.setItem(localStorageKey, stringifiedCredentials);
  store.dispatch(authSliceActions.setAuth(stringifiedCredentials));
};

export const logout = () => {
  localStorage.removeItem(localStorageKey);
  store.dispatch(authSliceActions.removeCredentials());
};

export const getAuthCredentials = (): UserCredential | null => {
  return store.getState().auth.credentials;
};

export const checkAuthLoader = () => {
  const credentials = getAuthCredentials();

  if (!credentials) {
    return redirect('/');
  }

  return null;
};

export const chechkNoAuthLoader = () => {
  const credentials = getAuthCredentials();

  if (credentials) {
    return redirect('/chat');
  }

  return null;
};

export const isValidMessage = (m: TeleportMessage) => {
  return m.username.trim().length > 0 && m.message.trim().length > 0;
};

export const isValidUser = (m: ChatMember) => {
  return m.username.trim().length > 0;
};
