import { createReducer, on } from '@ngrx/store';
import {
  addGift,
  changePhotoGift,
  clearGiftError,
  deleteGift,
  errorHandlerGift,
  getGift,
  getGiftByUserId,
  getGifts,
  getPhotoGift,
  setGift,
  setGifts,
  setPhotoGift,
  updateGift,
} from './gift.actions';
import { Gift } from '../gift.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

export interface State {
  gifts: Gift[];
  currentGift: Gift | null;
  error: ErrorResponse;
  loading: boolean;
}

const initalState: State = {
  gifts: [],
  currentGift: null,
  error: null,
  loading: false,
};

export const GiftReducer = createReducer(
  initalState,

  on(setGifts, (state, action) => {
    return action.Gifts != null
      ? { ...state, Gifts: [...action.Gifts], loading: false }
      : { ...state, Gifts: [], loading: false };
  }),

  on(setGift, (state, action) => {
    return { ...state, currentGift: action.Gift, loading: false };
  }),

  on(getGifts, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getGift, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getGiftByUserId, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(addGift, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(updateGift, (state, action) => {
    return {
      ...state,
      loading: true,
      currentGift: action.Gift,
    };
  }),

  on(deleteGift, (state, action) => {
    return {
      ...state,
      loading: true,
      currentGift: null,
    };
  }),

  on(changePhotoGift, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getPhotoGift, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(setPhotoGift, (state, action) => {
    return {
      ...state,
      loading: false,
      GiftPhoto: action.PhotoUrl,
    };
  }),

  on(errorHandlerGift, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(clearGiftError, (state, action) => {
    return {
      ...state,
      error: null,
    };
  })
);
