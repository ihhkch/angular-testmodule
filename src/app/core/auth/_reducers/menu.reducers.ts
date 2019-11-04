// NGRX
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
// Actions
import { MenuActionTypes, MenuActions } from '../_actions/menu.actions';
// Models
import { UserReport } from '../../../shared/models/user-report';

export interface MenuState extends EntityState<UserReport> {
    isAllMenuLoaded: boolean;
    menu: UserReport[];
}

export const adapter: EntityAdapter<UserReport> = createEntityAdapter<UserReport>();

export const initialMenuState: MenuState = adapter.getInitialState({
    isAllMenuLoaded: false,
    menu: undefined,
});

export function menuReducer(state = initialMenuState, action: MenuActions): MenuState {
    switch (action.type) {
        case MenuActionTypes.MenuRequested:
            return {
                ...state,
                isAllMenuLoaded: false
            };
        case MenuActionTypes.MenuLoaded:
            const _menu: UserReport[] = action.payload.menu;
            return adapter.addAll(action.payload.menu, {
                ...state,
                isAllMenuLoaded: true,
                menu: _menu
            });
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
