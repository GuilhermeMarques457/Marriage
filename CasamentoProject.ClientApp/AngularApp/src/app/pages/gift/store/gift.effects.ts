import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GiftActions from './gift.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { Gift } from '../gift.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setGifts, setPhotoGift } from './gift.actions';
import { setGift } from './gift.actions';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { environment } from '../../../../environments/environment';

const handleError = (response: ErrorResponse) => {
  let error = new ErrorResponse(
    'Um erro inesperado ocorreu',
    'Contate a central de ajuda para mais informações',
    '400'
  );

  if (!response.error)
    return of(GiftActions.errorHandlerGift({ error: error }));

  if (response.error.Details) error = response;

  return of(GiftActions.errorHandlerGift({ error: error }));
};

@Injectable()
export class GiftEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  private API_URL_BASE = `${environment.API_URL}/Gift`;

  getGifts = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.getGifts),
      switchMap(() =>
        this.http.get<Gift[]>(`${this.API_URL_BASE}/get-Gifts`).pipe(
          map((Gifts: Gift[]) => {
            return setGifts({ Gifts: Gifts });
          }),
          catchError((err) => handleError(err))
        )
      )
    )
  );

  getGift = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.getGift),
      switchMap((action) =>
        this.http.get<Gift>(`${this.API_URL_BASE}/get-Gift/${action.id}`).pipe(
          map((Gift: Gift) => {
            return setGift({ Gift: Gift });
          }),
          catchError((err) => handleError(err))
        )
      )
    )
  );

  getGiftByUserId = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.getGiftByUserId),
      switchMap((action) =>
        this.http
          .get<Gift>(
            `${this.API_URL_BASE}/get-Gift-by-user-id/${action.userId}`
          )
          .pipe(
            map((Gift: Gift) => {
              return setGift({ Gift: Gift });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  postGift = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.addGift),
      switchMap((action) => {
        return this.http
          .post<Gift>(`${this.API_URL_BASE}/post-Gift`, action.Gift)
          .pipe(
            map((Gift: Gift) => {
              return setGift({ Gift: Gift });
            }),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  updateGift = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.updateGift),
      switchMap((action) => {
        return this.http
          .put<Gift>(`${this.API_URL_BASE}/put-Gift`, action.Gift)
          .pipe(
            map((Gift: Gift) => {
              return setGift({ Gift: Gift });
            }),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  deleteGift = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.deleteGift),
      switchMap((action) =>
        this.http
          .delete<boolean>(`${this.API_URL_BASE}/delete-Gift/${action.id}`)
          .pipe(
            map((isDeleted: boolean) => {
              return setGift({ Gift: null });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  changePhotoGift = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GiftActions.changePhotoGift),
        switchMap((action) => {
          const formData: FormData = new FormData();

          formData.append('file', action.Photo);

          return this.http
            .put<Gift>(
              `${this.API_URL_BASE}/change-Gift-photo/${action.id}`,
              formData
            )
            .pipe(catchError((err) => handleError(err)));
        })
      ),
    { dispatch: false }
  );

  getPhotoGift = createEffect(() =>
    this.actions$.pipe(
      ofType(GiftActions.getPhotoGift),
      switchMap((action) =>
        this.http
          .get<Blob>(`${this.API_URL_BASE}/get-Gift-image/${action.Photo}`, {
            observe: 'response',
            responseType: 'blob' as 'json',
          })
          .pipe(
            map((response) => {
              // Aqui você pode acessar a resposta como um Blob
              const blob = response.body;

              // Se precisar exibir a imagem, você pode criar uma URL do blob
              const imageUrl = URL.createObjectURL(blob);

              return setPhotoGift({ PhotoUrl: imageUrl });
            })
          )
      )
    )
  );
}
