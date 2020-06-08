import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import * as AuthActions from '../store/auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(restData => {
                    const expirationDate = new Date(new Date().getTime() + +restData.expiresIn * 1000);
                    return of(new AuthActions.Login({email: restData.email, userId: restData.localId, token: restData.idToken, expirationDate: expirationDate}));
                }),
                catchError(error => {
                    //...
                    return of();    
                }));
               
        }),

    );


    constructor(private actions$: Actions, private http: HttpClient) {}
}