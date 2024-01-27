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
    return action.Guests != null
      ? { ...state, Guests: [...action.Guests], loading: false }
      : { ...state, Guests: [], loading: false };
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
    return {
      ...state,
      loading: true,
      Guests: [...state.guests],
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
