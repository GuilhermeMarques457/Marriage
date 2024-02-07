import { createReducer, on } from '@ngrx/store';

import { Guest } from '../guest.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import {
  addGuest,
  clearGuestError,
  deleteGuest,
  errorHandlerGuest,
  getGuest,
  getGuestByUserId,
  getGuests,
  getGuestsByMarriageId,
  setGuest,
  setGuests,
  updateGuest,
} from './guest.actions';

export interface State {
  guests: Guest[];
  currentGuest: Guest | null;
  error: ErrorResponse;
  loading: boolean;
}

const initalState: State = {
  guests: [],
  currentGuest: null,
  error: null,
  loading: false,
};

export const guestReducer = createReducer(
  initalState,

  on(setGuests, (state, action) => {
    console.log(action.Guests);
    return action.Guests != null
      ? { ...state, guests: action.Guests, loading: false }
      : { ...state, guests: [], loading: false };
  }),

  on(setGuest, (state, action) => {
    return { ...state, currentGuest: action.Guest, loading: false };
  }),

  on(getGuests, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getGuestsByMarriageId, (state, action) => {
    console.log();
    return {
      ...state,
      loading: true,
    };
  }),

  on(getGuest, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getGuestByUserId, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(addGuest, (state, action) => {
    console.log(action);
    return {
      ...state,
      loading: true,
      Guests: [...state.guests, action.Guest],
    };
  }),

  on(updateGuest, (state, action) => {
    return {
      ...state,
      loading: true,
      currentGuest: action.Guest,
    };
  }),

  on(deleteGuest, (state, action) => {
    return {
      ...state,
      loading: true,
      currentGuest: null,
    };
  }),

  on(errorHandlerGuest, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(clearGuestError, (state, action) => {
    return {
      ...state,
      error: null,
    };
  })
);
