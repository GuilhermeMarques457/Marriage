import { createAction, props } from '@ngrx/store';
import { Gift } from '../gift.model';
import { ErrorResponse } from '../../../shared/models/error-response.model';

export const setGifts = createAction(
  '[Gift] Set Gifts',
  props<{ Gifts: Gift[] | null }>()
);

export const setGift = createAction(
  '[Gift] Set Gift',
  props<{ Gift: Gift | null }>()
);

export const getGifts = createAction('[Gift] Fetch Gifts');

export const getGift = createAction('[Gift] Get Gift', props<{ id: string }>());

export const getGiftByUserId = createAction(
  '[Gift] Get Gift By User Id',
  props<{ userId: string }>()
);

export const addGift = createAction('[Gift] Add Gift', props<{ Gift: Gift }>());

export const updateGift = createAction(
  '[Gift] Update Gift',
  props<{ Gift: Gift }>()
);

export const changePhotoGift = createAction(
  '[Gift] Change the photo of the Gift',
  props<{ Photo: File; id: string }>()
);

export const getPhotoGift = createAction(
  '[Gift] Get the photo of the Gift',
  props<{ Photo: string }>()
);

export const setPhotoGift = createAction(
  '[Gift] Set the photo of the Gift',
  props<{ PhotoUrl: string }>()
);

export const deleteGift = createAction(
  '[Gift] Delete Gift',
  props<{ id: string }>()
);

export const errorHandlerGift = createAction(
  '[Gift] Error Handler Gift',
  props<{ error: ErrorResponse }>()
);

export const clearGiftError = createAction('[Gift] Clear Error');
