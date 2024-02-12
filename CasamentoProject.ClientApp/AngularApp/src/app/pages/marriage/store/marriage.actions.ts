import { createAction, props } from '@ngrx/store';
import { Marriage } from '../marriage.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

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

export const getMarriageByUserId = createAction(
  '[Marriage] Get Marriage By User Id',
  props<{ userId: string }>()
);

export const addMarriage = createAction(
  '[Marriage] Add Marriage',
  props<{ Marriage: Marriage; PhotoOfCouple: File }>()
);

export const updateMarriage = createAction(
  '[Marriage] Update Marriage',
  props<{ Marriage: Marriage }>()
);

export const changePhotoMarriage = createAction(
  '[Marriage] Change the photo of the Marriage',
  props<{ Photo: File; id: string }>()
);

export const getPhotoMarriage = createAction(
  '[Marriage] Get the photo of the Marriage',
  props<{ Photo: string }>()
);

export const setPhotoMarriage = createAction(
  '[Marriage] Set the photo of the Marriage',
  props<{ PhotoUrl: string }>()
);

export const deleteMarriage = createAction(
  '[Marriage] Delete Marriage',
  props<{ id: string }>()
);

export const errorHandlerMarriage = createAction(
  '[Marriage] Error Handler Marriage',
  props<{ error: ErrorResponse }>()
);

export const clearMarriageError = createAction('[Marriage] Clear Error');
