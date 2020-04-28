import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BucketService } from 'src/app/_services/bucket.service';
import { LoadEmployees,
  EmployeesActionTypes,
  LoadEmployeesSuccess,
  LoadEmployeesFailure,
  AddEmployee,
  AddEmployeeSuccess,
  AddEmployeeFailure
} from '../actions/employees.actions';

@Injectable()
export class EmployeesEffects {
  // GET FROM API
  @Effect() loadEmployees$ = this.actions.pipe(
    ofType<LoadEmployees>(EmployeesActionTypes.LOAD_EMPLOYEES),
    mergeMap(() =>
      this.bucketEmployee.getEmployeesList().pipe(
        map(data => new LoadEmployeesSuccess(data)),
        catchError(error => of(new LoadEmployeesFailure
          (error)))
      )
    )
  );

  // ADD
  @Effect() addEmployees$ = this.actions.pipe(
    ofType<AddEmployee>(EmployeesActionTypes.ADD_EMPLOYEE),
    mergeMap(data =>
      this.bucketEmployee.addEmployee(data.payload).pipe(
        map((res: any) => new AddEmployeeSuccess(res)),
        catchError(error => of(new AddEmployeeFailure(error)))
      )
    )
  );

  // ADD SUCCESS
  // @Effect({ dispatch: false }) addEmployeeSuccess$ = this.actions.pipe(
  //   ofType<AddEmployeeSuccess>(EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS),
  //   map(y => {
  //     return y.payload;
  //   })
  // );

  // UPDATE
  // @Effect() updateEmployees$ = this.actions.pipe(
  //   ofType<UpdateEmployee>(EmployeesActionTypes.UPDATE_EMPLOYEE),
  //   mergeMap(data =>
  //     this.bucketEmployee.updateEmployee(data.id, data.payload).pipe(
  //       map(res => new UpdateEmployeeSuccess(res)),
  //       catchError(error => of(new UpdateEmployeeFailure(error)))
  //     )
  //   )
  // );

  // UPDATE SUCCESS
  // @Effect({ dispatch: false }) updateEmployeeSuccess$ = this.actions.pipe(
  //   ofType<UpdateEmployeeSuccess>(EmployeesActionTypes.UPDATE_EMPLOYEE_SUCCESS),
  //   map(y => {
  //     return y.payload;
  //   })
  // );

  // REMOVE
  // @Effect() removeEmployees$ = this.actions.pipe(
  //   ofType<RemoveEmployee>(EmployeesActionTypes.REMOVE_EMPLOYEE),
  //   mergeMap(data =>
  //     this.bucketEmployee.deleteEmployee(data.payload).pipe(
  //       map(() => new RemoveEmployeeSuccess(data.payload)),
  //       catchError(error => of(new RemoveEmployeeFailure(error)))
  //     )
  //   )
  // );

  constructor(private actions: Actions, private bucketEmployee: BucketService) {}
}
