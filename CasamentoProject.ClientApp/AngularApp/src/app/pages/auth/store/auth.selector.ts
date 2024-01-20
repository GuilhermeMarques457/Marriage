import { AppState } from '../../../store/app.reducer';

export const selectAuthState = (state: AppState) => state.auth;
export const selectAuthUserAuthenticated = (state: AppState) =>
  state.auth.userAuthenticated;
export const selectAuthTimer = (state: AppState) =>
  state.auth.timeToLogoutFormatted;
export const selectAuthTimerIsActive = (state: AppState) =>
  state.auth.timeOutIsActive;
