import { createAction, props } from '@ngrx/store';
import { Marriage } from '../marriage.model';

export const setMarriages = createAction(
  '[Marriage] Set Marriages',
  props<{ Marriages: Marriage[] }>()
);

export const setMarriage = createAction(
  '[Marriage] Set Marriage',
  props<{ Marriage: Marriage }>()
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
  props<{ id: number }>()
);

export const errorHandlerMarriage = createAction(
  '[Marriage] Error Handler Marriage',
  props<{ error: string }>()
);
