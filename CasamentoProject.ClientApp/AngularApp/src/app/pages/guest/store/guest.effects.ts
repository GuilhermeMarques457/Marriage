import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GuestActions from './guest.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Guest } from '../guest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorResponse } from '../../../shared/models/error-response.model';
import { environment } from '../../../../environments/environment';
import { setGuest, setGuests } from './guest.actions';

const handleError = (response: ErrorResponse) => {
  let error = new ErrorResponse(
    'Um erro inesperado ocorreu',
    'Contate a central de ajuda para mais informações',
    '400'
  );

  if (!response.error)
    return of(GuestActions.errorHandlerGuest({ error: error }));

  if (response.error.Details) error = response;

  return of(GuestActions.errorHandlerGuest({ error: error }));
};

@Injectable()
export class GuestEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  private API_URL_BASE = `${environment.API_URL}/Guest`;

  getGuests = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.getGuests),
      switchMap(() =>
        this.http.get<Guest[]>(`${this.API_URL_BASE}/get-guests`).pipe(
          map((Guests: Guest[]) => {
            return setGuests({ Guests: Guests });
          }),
          catchError((err) => handleError(err))
        )
      )
    )
  );

  getGuest = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.getGuest),
      switchMap((action) =>
        this.http
          .get<Guest>(`${this.API_URL_BASE}/get-guest/${action.id}`)
          .pipe(
            map((Guest: Guest) => {
              return setGuest({ Guest: Guest });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  getGuestByUserId = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.getGuestByUserId),
      switchMap((action) =>
        this.http
          .get<Guest>(
            `${this.API_URL_BASE}/get-guest-by-user-id/${action.userId}`
          )
          .pipe(
            map((Guest: Guest) => {
              return setGuest({ Guest: Guest });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  postGuest = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.addGuest),
      switchMap((action) => {
        return this.http
          .post<Guest>(`${this.API_URL_BASE}/post-guest`, action.Guest)
          .pipe(
            map((Guest: Guest) => {
              console.log(Guest);
              return setGuest({ Guest: Guest });
            }),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  updateGuest = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.updateGuest),
      switchMap((action) =>
        this.http
          .put<Guest>(`${this.API_URL_BASE}/put-guest`, action.Guest)
          .pipe(
            map((Guest: Guest) => {
              return setGuest({ Guest: Guest });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  deleteGuest = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestActions.deleteGuest),
      switchMap((action) =>
        this.http
          .delete<boolean>(`${this.API_URL_BASE}/delete-guest/${action.id}`)
          .pipe(
            map((isDeleted: boolean) => {
              return setGuest({ Guest: null });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );
}