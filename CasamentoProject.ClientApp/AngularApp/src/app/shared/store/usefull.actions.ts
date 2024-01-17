import { createAction, props } from '@ngrx/store';

export const setInputIsDisable = createAction(
  '[Usefull] Change Input Disable',
  props<{ isDisabled: boolean }>()
);
