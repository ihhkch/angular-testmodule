// NGRX
import { Action } from '@ngrx/store';
// CRUD
import { UserReport } from '../../../shared/models/user-report';

export enum MenuActionTypes {
    MenuRequested = '[Request Menu] Action',
    MenuLoaded = '[Load Menu] Auth API'
}

export class MenuRequested implements Action {
    readonly type = MenuActionTypes.MenuRequested;
}

export class MenuLoaded implements Action {
	readonly type = MenuActionTypes.MenuLoaded;
	constructor(public payload: { menu: UserReport[] }) { }
}

export type MenuActions = MenuRequested | MenuLoaded;
