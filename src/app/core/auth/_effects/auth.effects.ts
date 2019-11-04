// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom, map, catchError, switchMap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested, AuthUserLoaded } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';
import { AuthUser } from '../_models/auth.model';

@Injectable()
export class AuthEffects {
    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
		ofType<Login>(AuthActionTypes.Login),
		switchMap(( { payload } ) => {
			localStorage.setItem(environment.authTokenKey, payload.authToken);
			return this.auth.getUserGrant().pipe(
				map((_user: AuthUser) => {
					this.store.dispatch(new AuthUserLoaded({ user: _user }));
					return _user;
				}),
				catchError((error: any) => {
					console.log(error);
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_GRANT'), 'danger');
					this.store.dispatch(new Logout());

					return error;
				})
			);
		})
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.authTokenKey);
			this.router.navigate(['/login'], {queryParams: {returnUrl: this.returnUrl}});
        })
    );

	/*
    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.authTokenKey, action.payload.authToken);
        })
    );
*/
	/*
    @Effect({dispatch: false})
    loadUser$ = this.actions$
    .pipe(
        ofType<UserRequested>(AuthActionTypes.UserRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
        tap(_user => {
            if (_user) {
                this.store.dispatch(new UserLoaded({ user: _user }));
            } else {
                this.store.dispatch(new Logout());
            }
        })
	);*/

    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({type: 'NO_ACTION'});
        if (userToken) {
            observableResult = of(new Login({  authToken: userToken }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
		private store: Store<AppState>,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}
