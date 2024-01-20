import { createAction, props } from '@ngrx/store';
import { UserSignUp } from '../models/user.signUp.model';
import { UserLogin } from '../models/user.login.model';
import { UserAuthenticated } from '../models/user.authenticated.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

//#region Auth Auth Success/Fail
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

//#endregion

//#region Auth default actions login/logout/signUp
export const signUp = createAction(
  '[Auth] SignUp',
  props<{ user: UserSignUp }>()
);

export const login = createAction('[Auth] Login', props<{ user: UserLogin }>());

export const autoLogin = createAction('[Auth] AutoLogin');

export const clearAuthError = createAction('[Auth] ClearError');

export const logout = createAction('[Auth] Logout');

//#endregion

//#region Jwt token Actions
export const refreshJWTToken = createAction(
  '[Auth] RefreshJWTToken',
  props<{ token: string; refreshToken: string }>()
);
//#endregion

//#region Form Efect

export const setLoginActive = createAction('[Auth] Set Login To Active');

export const setSignUpActive = createAction('[Auth] Set SignUp To Active');
//#endregion

//#region AutoLogout Actions

export const setTimoutToLogout = createAction(
  '[Auth] Set Timout To Logout',
  props<{ dateToLogout: Date; timerIsActive: boolean }>()
);

export const setNewTimeToLogout = createAction(
  '[Auth] Set Date Formatted To Logout',
  props<{ dateFormatted: string }>()
);

//#endregion
