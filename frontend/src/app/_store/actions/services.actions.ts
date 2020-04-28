import { Action } from '@ngrx/store';
import { ServiceModel } from 'src/app/_models/ServiceModel';

// LOAD IS FROM API
export enum ServicesActionTypes {
  LOAD_SERVICES = '[Services Page] Load assets',
  LOAD_SERVICES_SUCCESS = '[Services Page] Load assets Success',
  LOAD_SERVICES_FAILURE = '[Services Page] Load assets Failure',
  ADD_SERVICE = '[Services Page] Add asset',
  ADD_SERVICE_SUCCESS = '[Services Page] Add asset Success',
  ADD_SERVICE_FAILURE = '[Services Page] Add asset Failure',
  UPDATE_SERVICE = '[Services Page] Update asset',
  UPDATE_SERVICE_SUCCESS = '[Services Page] Update asset Success',
  UPDATE_SERVICE_FAILURE = '[Services Page] Update asset Failure',
  REMOVE_SERVICE = '[Services Page] Remove asset',
  REMOVE_SERVICE_SUCCESS = '[Services Page] Remove asset Success',
  REMOVE_SERVICE_FAILURE = '[Services Page] Remove asset Failure'
}

export class LoadServices implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES;
}
export class LoadServicesSuccess implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_SUCCESS;
  constructor(public payload: ServiceModel[]) {}
}
export class LoadServicesFailure implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_FAILURE;
  constructor(public payload: Error) {}
}

// ADD
export class AddService implements Action {
  readonly type = ServicesActionTypes.ADD_SERVICE;
  constructor(public id: number, public payload: ServiceModel) {}
}
export class AddServiceSuccess implements Action {
  readonly type = ServicesActionTypes.ADD_SERVICE_SUCCESS;
  constructor(public payload: ServiceModel) {}
}
export class AddServiceFailure implements Action {
  readonly type = ServicesActionTypes.ADD_SERVICE_FAILURE;
  constructor(public payload: Error) {}
}

// UPDATE
export class UpdateService implements Action {
  readonly type = ServicesActionTypes.UPDATE_SERVICE;
  constructor(public id: number, public payload: ServiceModel) {}
}
export class UpdateServiceSuccess implements Action {
  readonly type = ServicesActionTypes.UPDATE_SERVICE_SUCCESS;
  constructor(public payload: ServiceModel) {}
}
export class UpdateServiceFailure implements Action {
  readonly type = ServicesActionTypes.UPDATE_SERVICE_FAILURE;
  constructor(public payload: Error) {}
}

// REMOVE
export class RemoveService implements Action {
  readonly type = ServicesActionTypes.REMOVE_SERVICE;
  constructor(public payload: number) {}
}
export class RemoveServiceSuccess implements Action {
  readonly type = ServicesActionTypes.REMOVE_SERVICE_SUCCESS;
  constructor(public payload: number) {}
}
export class RemoveServiceFailure implements Action {
  readonly type = ServicesActionTypes.REMOVE_SERVICE_FAILURE;
  constructor(public payload: Error) {}
}

export type ServicesActions =
  | LoadServices
  | LoadServicesSuccess
  | LoadServicesFailure
  | AddService
  | AddServiceSuccess
  | AddServiceFailure
  | UpdateService
  | UpdateServiceSuccess
  | UpdateServiceFailure
  | RemoveService
  | RemoveServiceSuccess
  | RemoveServiceFailure;
