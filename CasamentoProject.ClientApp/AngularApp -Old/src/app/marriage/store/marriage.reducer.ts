import { createReducer, on } from '@ngrx/store';
import {
  addMarriage,
  clearError,
  deleteMarriage,
  errorHandlerMarriage,
  getMarriage,
  getMarriages,
  setMarriage,
  setMarriages,
  updateMarriage,
} from './marriage.actions';
import { Marriage } from '../marriage.model';

export interface State {
  Marriages: Marriage[];
  currentMarriage: Marriage;
  error: string;
  loading: boolean;
}

const initalState: State = {
  Marriages: [],
  currentMarriage: null,
  error: null,
  loading: false,
};

export const marriageReducer = createReducer(
  initalState,

  on(setMarriages, (state, action) => {
    console.log(action.Marriages);
    return { ...state, Marriages: [...action.Marriages], loading: false };
  }),

  on(setMarriage, (state, action) => {
    console.log(action.Marriage);
    return { ...state, currentMarriage: action.Marriage, loading: false };
  }),

  on(getMarriages, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getMarriage, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(addMarriage, (state, action) => {
    return {
      ...state,
      loading: true,
      Marriages: [...state.Marriages],
    };
  }),

  on(updateMarriage, (state, action) => {
    return {
      ...state,
      loading: true,
      Marriages: state.Marriages,
    };
  }),

  on(deleteMarriage, (state, action) => {
    return {
      ...state,
      loading: true,
      Marriages: state.Marriages,
    };
  }),

  on(errorHandlerMarriage, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(clearError, (state, action) => {
    return {
      ...state,
      error: null,
    };
  })
);
