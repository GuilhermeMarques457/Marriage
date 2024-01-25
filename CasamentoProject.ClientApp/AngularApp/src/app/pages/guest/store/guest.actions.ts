import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { Guest } from '../guest.model';

export const setGuests = createAction(
  '[Guest] Set Guests',
  props<{ Guests: Guest[] | null }>()
);

export const setGuest = createAction(
  '[Guest] Set Guest',
  props<{ Guest: Guest | null }>()
);

export const getGuests = createAction('[Guest] Fetch Guests');

export const getGuest = createAction(
  '[Guest] Get Guest',
  props<{ id: string }>()
);

export const getGuestByUserId = createAction(
  '[Guest] Get Guest By User Id',
  props<{ userId: string }>()
);

export const addGuest = createAction(
  '[Guest] Add Guest',
  props<{ Guest: Guest }>()
);

export const updateGuest = createAction(
  '[Guest] Update Guest',
  props<{ Guest: Guest }>()
);

export const deleteGuest = createAction(
  '[Guest] Delete Guest',
  props<{ id: string }>()
);

export const errorHandlerGuest = createAction(
  '[Guest] Error Handler Guest',
  props<{ error: ErrorResponse }>()
);

export const clearGuestError = createAction('[Guest] Clear Error');
