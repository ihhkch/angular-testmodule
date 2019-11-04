// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// State
import { ProfilesState } from '../_reducers/profile.reducers';

export const selectProfilesState = createFeatureSelector<ProfilesState>('profiles');

export const currentProfile = createSelector(
    selectProfilesState,
    profile => {
		return profile.profile;
	}
);

export const isProfileLoaded = createSelector(
    selectProfilesState,
    profile => profile.isProfileLoaded
);
