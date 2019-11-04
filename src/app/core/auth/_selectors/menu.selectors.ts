import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectMenuState = state => state.menu;

export const currentMenu = createSelector(
	selectMenuState,
	menu => {
		if (!menu) {
			return [];
		}
		return menu;
	}
);
