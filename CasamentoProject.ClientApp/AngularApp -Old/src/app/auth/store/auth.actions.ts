import { createAction, props } from '@ngrx/store';
import { UserSignUp } from '../user.signUp.model';
import { UserLogin } from '../user.login.model';
import { UserAuthenticated } from '../user.authenticated.model';

export const authenticateSucess = createAction(
  '[Auth] AuthenticateSucess',
  props<{
    user: UserAuthenticated;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  '[Auth] AuthenticateFail',
  props<{ error: string }>()
);

export const signUp = createAction(
  '[Auth] SignUp',
  props<{ user: UserSignUp }>()
);

export const login = createAction('[Auth] Login', props<{ user: UserLogin }>());

export const setLoginActive = createAction('[Auth] Set Login To Active');

export const setSignUpActive = createAction('[Auth] Set SignUp To Active');

export const autoLogin = createAction('[Auth] AutoLogin');

export const clearError = createAction('[Auth] ClearError');

export const logout = createAction('[Auth] Logout');
