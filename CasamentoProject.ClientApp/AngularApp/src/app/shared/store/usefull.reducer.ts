import { createReducer, on } from '@ngrx/store';
import { setInputIsDisable } from './usefull.actions';

export interface State {
  isInputDisabled: boolean;
}

const initalState: State = {
  isInputDisabled: false,
};

export const usefullReducer = createReducer(
  initalState,
  on(setInputIsDisable, (state, action) => {
    return {
      ...state,
      isInputDisabled: action.isDisabled,
    };
  })
);
