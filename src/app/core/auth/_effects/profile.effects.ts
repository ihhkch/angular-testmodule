// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action,Store, select } from '@ngrx/store';
// Services
import { AuthService } from '../_services/auth.service';
//import { GrantService } from '../../../shared/services/grant.service';
// Actions
import {
	ProfileRequested,
	ProfileLoaded,
	ProfileActionTypes
} from '../_actions/profile.actions';
// Models
//import { Profile } from '../_models/profile.model';
import { AppState } from '../../reducers';
import { Logout } from '../_actions/auth.actions';
import { isUserLoaded } from '../_selectors/auth.selectors';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';


@Injectable()
export class ProfileEffects {
	@Effect({dispatch: false})
    loadUser$ = this.actions$
    .pipe(
        ofType<ProfileRequested>(ProfileActionTypes.ProfileRequested),
        withLatestFrom(this.store.pipe(select(isUserLoaded))),
        filter(([action, _isUserLoaded]) => !_isUserLoaded),
        mergeMap(([action, _isUserLoaded]) => this.auth.getUserProfile()),
        tap(_profile => {
            if (_profile) {
                this.store.dispatch(new ProfileLoaded({ profile: _profile }));
            } else {
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_GRANT'), 'danger');
                this.store.dispatch(new Logout());
            }
        })
	);

	constructor(private actions$: Actions,
		private auth: AuthService,
		private store: Store<AppState>,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService) { }
}
