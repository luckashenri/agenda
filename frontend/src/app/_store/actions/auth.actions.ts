import { Action } from '@ngrx/store';

// LOAD IS FROM API
export enum AuthActionTypes {
  LOGOUT = '[Auth Page] Logout'
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}
