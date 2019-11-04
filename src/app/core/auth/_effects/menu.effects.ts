// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
// Services
import { AuthService } from '../../../shared/services/auth.service';
// Actions
import {
	MenuRequested,
	MenuLoaded,
	MenuActionTypes
} from '../_actions/menu.actions';
// Models
import { UserReport } from '../../../shared/models/user-report';

@Injectable()
export class MenuEffects {
    @Effect()
    menuLoaded$ = this.actions$
        .pipe(
            ofType<MenuRequested>(MenuActionTypes.MenuRequested),
            mergeMap(() => this.auth.getCurrentReports()),
            map((result: UserReport[]) => {
                return new MenuLoaded({
                    menu: result
                });
            })
		  );

    constructor(private actions$: Actions, private auth: AuthService) { }
}
