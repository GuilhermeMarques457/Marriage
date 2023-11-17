import { createReducer, on } from '@ngrx/store';

import {
  authenticateFail,
  authenticateSucess,
  clearError,
  login,
  logout,
  signUp,
} from './auth.actions';
import { UserSignUp } from '../user.signUp.model';
import { UserLogin } from '../user.login.model';
import { UserAuthenticated } from '../user.authenticated.model';

export interface State {
  userSignUp: UserSignUp;
  userLogin: UserLogin;
  userAuthenticated: UserAuthenticated;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  userSignUp: null,
  userLogin: null,
  userAuthenticated: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authenticateSucess, (state, action) => {
    const user = new UserAuthenticated(action.user.email, action.user.password);

    return {
      ...state,
      authError: null,
      userAuthenticated: user,
      loading: false,
    };
  }),
  on(clearError, (state, action) => {
    return { ...state, authError: null };
  }),
  on(login, (state, action) => {
    return { ...state, authError: null, loading: true };
  }),
  on(signUp, (state, action) => {
    return { ...state, authError: null, loading: true };
  }),
  on(authenticateFail, (state, action) => {
    return {
      ...state,
      userAuthenticated: null,
      authError: action.error,
      loading: false,
    };
  }),
  on(logout, (state, action) => {
    return { ...state, userAuthenticated: null };
  })
);
