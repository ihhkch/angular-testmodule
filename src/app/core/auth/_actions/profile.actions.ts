// NGRX
import { Action } from '@ngrx/store';
// CRUD
import { Profile } from '../_models/profile.model';

export enum ProfileActionTypes {
    ProfileRequested = '[Request Profile] Action',
    ProfileLoaded = '[Load Profile] Auth API'
}

export class ProfileRequested implements Action {
    readonly type = ProfileActionTypes.ProfileRequested;
}

export class ProfileLoaded implements Action {
	readonly type = ProfileActionTypes.ProfileLoaded;
	constructor(public payload: { profile: Profile }) { }
}

export type ProfileActions = ProfileRequested | ProfileLoaded;
