import { Action } from '@ngrx/store';
import { EmployeeModel } from 'src/app/_models/EmployeeModel';

// LOAD IS FROM API
export enum EmployeesActionTypes {
  LOAD_EMPLOYEES = '[Employees Page] Load assets',
  LOAD_EMPLOYEES_SUCCESS = '[Employees Page] Load assets Success',
  LOAD_EMPLOYEES_FAILURE = '[Employees Page] Load assets Failure',
  ADD_EMPLOYEE = '[Employees Page] Add asset',
  ADD_EMPLOYEE_SUCCESS = '[Employees Page] Add asset Success',
  ADD_EMPLOYEE_FAILURE = '[Employees Page] Add asset Failure',
  UPDATE_EMPLOYEE = '[Employees Page] Update asset',
  UPDATE_EMPLOYEE_SUCCESS = '[Employees Page] Update asset Success',
  UPDATE_EMPLOYEE_FAILURE = '[Employees Page] Update asset Failure',
  REMOVE_EMPLOYEE = '[Employees Page] Remove asset',
  REMOVE_EMPLOYEE_SUCCESS = '[Employees Page] Remove asset Success',
  REMOVE_EMPLOYEE_FAILURE = '[Employees Page] Remove asset Failure'
}

export class LoadEmployees implements Action {
  readonly type = EmployeesActionTypes.LOAD_EMPLOYEES;
}
export class LoadEmployeesSuccess implements Action {
  readonly type = EmployeesActionTypes.LOAD_EMPLOYEES_SUCCESS;
  constructor(public payload: EmployeeModel[]) {}
}
export class LoadEmployeesFailure implements Action {
  readonly type = EmployeesActionTypes.LOAD_EMPLOYEES_FAILURE;
  constructor(public payload: Error) {}
}

// ADD
export class AddEmployee implements Action {
  readonly type = EmployeesActionTypes.ADD_EMPLOYEE;
  constructor(public id: number, public payload: EmployeeModel) {}
}
export class AddEmployeeSuccess implements Action {
  readonly type = EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS;
  constructor(public payload: EmployeeModel) {}
}
export class AddEmployeeFailure implements Action {
  readonly type = EmployeesActionTypes.ADD_EMPLOYEE_FAILURE;
  constructor(public payload: Error) {}
}

// UPDATE
export class UpdateEmployee implements Action {
  readonly type = EmployeesActionTypes.UPDATE_EMPLOYEE;
  constructor(public id: number, public payload: EmployeeModel) {}
}
export class UpdateEmployeeSuccess implements Action {
  readonly type = EmployeesActionTypes.UPDATE_EMPLOYEE_SUCCESS;
  constructor(public payload: EmployeeModel) {}
}
export class UpdateEmployeeFailure implements Action {
  readonly type = EmployeesActionTypes.UPDATE_EMPLOYEE_FAILURE;
  constructor(public payload: Error) {}
}

// REMOVE
export class RemoveEmployee implements Action {
  readonly type = EmployeesActionTypes.REMOVE_EMPLOYEE;
  constructor(public payload: number) {}
}
export class RemoveEmployeeSuccess implements Action {
  readonly type = EmployeesActionTypes.REMOVE_EMPLOYEE_SUCCESS;
  constructor(public payload: number) {}
}
export class RemoveEmployeeFailure implements Action {
  readonly type = EmployeesActionTypes.REMOVE_EMPLOYEE_FAILURE;
  constructor(public payload: Error) {}
}

export type EmployeesActions =
  | LoadEmployees
  | LoadEmployeesSuccess
  | LoadEmployeesFailure
  | AddEmployee
  | AddEmployeeSuccess
  | AddEmployeeFailure
  | UpdateEmployee
  | UpdateEmployeeSuccess
  | UpdateEmployeeFailure
  | RemoveEmployee
  | RemoveEmployeeSuccess
  | RemoveEmployeeFailure;
