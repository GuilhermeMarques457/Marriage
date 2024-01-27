import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MarriageActions from './marriage.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Marriage } from '../marriage.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setMarriages } from './marriage.actions';
import { setMarriage } from './marriage.actions';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { environment } from '../../../../environments/environment';

const handleError = (response: ErrorResponse) => {
  let error = new ErrorResponse(
    'Um erro inesperado ocorreu',
    'Contate a central de ajuda para mais informações',
    '400'
  );

  if (!response.error)
    return of(MarriageActions.errorHandlerMarriage({ error: error }));

  if (response.error.Details) error = response;

  return of(MarriageActions.errorHandlerMarriage({ error: error }));
};

@Injectable()
export class MarriageEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  private API_URL_BASE = `${environment.API_URL}/Marriage`;

  getMarriages = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.getMarriages),
      switchMap(() =>
        this.http.get<Marriage[]>(`${this.API_URL_BASE}/get-marriages`).pipe(
          map((marriages: Marriage[]) => {
            return setMarriages({ Marriages: marriages });
          }),
          catchError((err) => handleError(err))
        )
      )
    )
  );

  getMarriage = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.getMarriage),
      switchMap((action) =>
        this.http
          .get<Marriage>(`${this.API_URL_BASE}/get-marriage/${action.id}`)
          .pipe(
            map((Marriage: Marriage) => {
              return setMarriage({ Marriage: Marriage });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  getMarriageByUserId = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.getMarriageByUserId),
      switchMap((action) =>
        this.http
          .get<Marriage>(
            `${this.API_URL_BASE}/get-marriage-by-user-id/${action.userId}`
          )
          .pipe(
            map((Marriage: Marriage) => {
              return setMarriage({ Marriage: Marriage });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );

  postMarriage = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.addMarriage),
      switchMap((action) => {
        return this.http
          .post<Marriage>(`${this.API_URL_BASE}/post-marriage`, {
            ...action.Marriage,
            file: action.Photo,
          })
          .pipe(
            map((Marriage: Marriage) => {
              console.log(Marriage);
              return setMarriage({ Marriage: Marriage });
            }),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  updateMarriage = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.updateMarriage),
      switchMap((action) => {
        const formData: FormData = new FormData();
        formData.append('file', action.Photo);

        return this.http
          .put<Marriage>(`${this.API_URL_BASE}/put-marriage`, formData)
          .pipe(
            map((Marriage: Marriage) => {
              return setMarriage({ Marriage: Marriage });
            }),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  deleteMarriage = createEffect(() =>
    this.actions$.pipe(
      ofType(MarriageActions.deleteMarriage),
      switchMap((action) =>
        this.http
          .delete<boolean>(`${this.API_URL_BASE}/delete-marriage/${action.id}`)
          .pipe(
            map((isDeleted: boolean) => {
              return setMarriage({ Marriage: null });
            }),
            catchError((err) => handleError(err))
          )
      )
    )
  );
}
