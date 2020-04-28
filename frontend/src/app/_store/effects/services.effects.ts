import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoadServices, ServicesActionTypes, LoadServicesFailure, AddServiceSuccess, AddServiceFailure, AddService, UpdateService, UpdateServiceSuccess, UpdateServiceFailure, RemoveService, RemoveServiceSuccess, RemoveServiceFailure, LoadServicesSuccess } from '../actions/services.actions';
import { BucketService } from 'src/app/_services/bucket.service';

@Injectable()
export class ServicesEffects {
  // GET FROM API
  @Effect() loadServices$ = this.actions.pipe(
    ofType<LoadServices>(ServicesActionTypes.LOAD_SERVICES),
    mergeMap(() =>
      this.bucketService.getServicesList().pipe(
        map(data => new LoadServicesSuccess(data)),
        catchError(error => of(new LoadServicesFailure(error)))
      )
    )
  );

  // ADD
  @Effect() addServices$ = this.actions.pipe(
    ofType<AddService>(ServicesActionTypes.ADD_SERVICE),
    mergeMap(data =>
      this.bucketService.addService(data.payload).pipe(
        map((res: any) => new AddServiceSuccess(res)),
        catchError(error => of(new AddServiceFailure(error)))
      )
    )
  );

  // ADD SUCCESS
  // @Effect({ dispatch: false }) addServiceSuccess$ = this.actions.pipe(
  //   ofType<AddServiceSuccess>(ServicesActionTypes.ADD_SERVICE_SUCCESS),
  //   map(y => {
  //     return y.payload;
  //   })
  // );

  // UPDATE
  // @Effect() updateServices$ = this.actions.pipe(
  //   ofType<UpdateService>(ServicesActionTypes.UPDATE_SERVICE),
  //   mergeMap(data =>
  //     this.bucketService.updateService(data.id, data.payload).pipe(
  //       map(res => new UpdateServiceSuccess(res)),
  //       catchError(error => of(new UpdateServiceFailure(error)))
  //     )
  //   )
  // );

  // UPDATE SUCCESS
  // @Effect({ dispatch: false }) updateServiceSuccess$ = this.actions.pipe(
  //   ofType<UpdateServiceSuccess>(ServicesActionTypes.UPDATE_SERVICE_SUCCESS),
  //   map(y => {
  //     return y.payload;
  //   })
  // );

  // REMOVE
  // @Effect() removeServices$ = this.actions.pipe(
  //   ofType<RemoveService>(ServicesActionTypes.REMOVE_SERVICE),
  //   mergeMap(data =>
  //     this.bucketService.deleteService(data.payload).pipe(
  //       map(() => new RemoveServiceSuccess(data.payload)),
  //       catchError(error => of(new RemoveServiceFailure(error)))
  //     )
  //   )
  // );

  constructor(private actions: Actions, private bucketService: BucketService) {}
}
