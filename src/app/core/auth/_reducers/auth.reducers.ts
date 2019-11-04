// Actions
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
// Models
import { User } from '../_models/user.model';
import { AuthUser } from '../_models/auth.model';

export interface AuthState {
    loggedIn: boolean;
    authToken: string;
	user: User;
	authUser: AuthUser;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: undefined,
	user: undefined,
	authUser: undefined,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                authToken: _token,
				user: undefined,
				authUser: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Register: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                authToken: _token,
				user: undefined,
				authUser: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true
            };
        }


		case AuthActionTypes.AuthUserLoaded: {
            const _user: AuthUser = action.payload.user;
            return {
                ...state,
                authUser: _user,
                isUserLoaded: true
            };
        }

        default:
            return state;
    }
}
