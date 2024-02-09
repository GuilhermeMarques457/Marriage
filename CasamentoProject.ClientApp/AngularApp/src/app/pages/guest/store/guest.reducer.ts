import { createReducer, on } from '@ngrx/store';

import { Guest } from '../models/guest.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import {
  addGuest,
  clearGuestError,
  deleteGuest,
  errorHandlerGuest,
  getFamilyMembersByGuestId,
  getGuest,
  getGuestByUserId,
  getGuests,
  getGuestsByMarriageId,
  setFamilyMembers,
  setGuest,
  setGuests,
  updateGuest,
} from './guest.actions';
import { FamilyMember } from '../models/family.model';

export interface State {
  guests: Guest[];
  currentGuest: Guest | null;
  currentFamilyMembers: FamilyMember[];
  error: ErrorResponse;
  loading: boolean;
}

const initalState: State = {
  guests: [],
  currentFamilyMembers: [],
  currentGuest: null,
  error: null,
  loading: false,
};

export const guestReducer = createReducer(
  initalState,

  on(setGuests, (state, action) => {
    return action.Guests != null
      ? { ...state, guests: action.Guests, loading: false }
      : { ...state, guests: [], loading: false };
  }),

  on(setFamilyMembers, (state, action) => {
    return action.Family != null
      ? { ...state, currentFamilyMembers: action.Family, loading: false }
      : { ...state, currentFamilyMembers: [], loading: false };
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
    return {
      ...state,
      loading: true,
    };
  }),

  on(getFamilyMembersByGuestId, (state, action) => {
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
