import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromMarriage from '../marriage/store/marriage.reducer';

export interface AppState {
  auth: fromAuth.State;
  marriage: fromMarriage.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  marriage: fromMarriage.marriageReducer,
};
