import { createAction, props } from '@ngrx/store';
import { Marriage } from '../marriage.model';

export const setMarriages = createAction(
  '[Marriage] Set Marriages',
  props<{ Marriages: Marriage[] | null }>()
);

export const setMarriage = createAction(
  '[Marriage] Set Marriage',
  props<{ Marriage: Marriage | null }>()
);

export const getMarriages = createAction('[Marriage] Fetch Marriages');

export const getMarriage = createAction(
  '[Marriage] Get Marriage',
  props<{ id: string }>()
);

export const addMarriage = createAction(
  '[Marriage] Add Marriage',
  props<{ Marriage: Marriage }>()
);

export const updateMarriage = createAction(
  '[Marriage] Update Marriage',
  props<{ Marriage: Marriage }>()
);

export const deleteMarriage = createAction(
  '[Marriage] Delete Marriage',
  props<{ id: string }>()
);

export const errorHandlerMarriage = createAction(
  '[Marriage] Error Handler Marriage',
  props<{ error: string | null }>()
);

export const clearError = createAction('[Marriage] Clear Error');
