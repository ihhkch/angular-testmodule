// NGRX
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
// Actions
import {
	ProfileActionTypes,
	ProfileActions
} from '../_actions/profile.actions';
// Models
import { Profile } from '../_models/profile.model';

export interface ProfilesState {
	isProfileLoaded: boolean;
	profile: Profile;
}

export const initialProfilesState: ProfilesState = {
	isProfileLoaded: false,
	profile: undefined
};

export function profilesReducer(state = initialProfilesState, action: ProfileActions): ProfilesState {
    switch  (action.type) {
        case ProfileActionTypes.ProfileRequested:
            return initialProfilesState;
		case ProfileActionTypes.ProfileLoaded:
			const _profile: Profile = action.payload.profile;
            return {
                isProfileLoaded: true,
				profile: _profile
            };
        default:
            return state;
    }
}
