import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../pages/auth/store/auth.reducer';
import * as fromUsefull from '../shared/store/usefull.reducer';
import * as fromMarriage from '../pages/marriage/store/marriage.reducer';
import * as fromGuest from '../pages/guest/store/guest.reducer';
import * as fromGift from '../pages/gift/store/gift.reducer';

export interface AppState {
  auth: fromAuth.State;
  marriage: fromMarriage.State;
  guest: fromGuest.State;
  gift: fromGift.State;
  usefull: fromUsefull.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  marriage: fromMarriage.marriageReducer,
  guest: fromGuest.guestReducer,
  gift: fromGift.GiftReducer,
  usefull: fromUsefull.usefullReducer,
};
