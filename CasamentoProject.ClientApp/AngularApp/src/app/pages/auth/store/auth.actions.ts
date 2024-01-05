import { createAction, props } from '@ngrx/store';
import { UserSignUp } from '../models/user.signUp.model';
import { UserLogin } from '../models/user.login.model';
import { UserAuthenticated } from '../models/user.authenticated.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

export const authenticateSucess = createAction(
  '[Auth] AuthenticateSucess',
  props<{
    user: UserAuthenticated;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  '[Auth] AuthenticateFail',
  props<{ error: ErrorResponse }>()
);

export const signUp = createAction(
  '[Auth] SignUp',
  props<{ user: UserSignUp }>()
);

export const login = createAction('[Auth] Login', props<{ user: UserLogin }>());

export const setLoginActive = createAction('[Auth] Set Login To Active');

export const setSignUpActive = createAction('[Auth] Set SignUp To Active');

export const autoLogin = createAction('[Auth] AutoLogin');

export const refreshJWTToken = createAction(
  '[Auth] RefreshJWTToken',
  props<{ token: string; refreshToken: string }>()
);

export const clearError = createAction('[Auth] ClearError');

export const logout = createAction('[Auth] Logout');
