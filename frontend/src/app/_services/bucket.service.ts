import { Injector, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ServicesService } from './services.service';
import { Observable } from 'rxjs';
import { ServiceModel } from '../_models/ServiceModel';
import { EmployeesService } from './employees.service';
import { EmployeeModel } from '../_models/EmployeeModel';

@Injectable()
export class BucketService {
  private servicesService: ServicesService;
  public get _services(): ServicesService {
    if (!this.servicesService) {
      this.servicesService = this.injector.get(ServicesService);
    }
    return this.servicesService;
  }

  private employeesService: EmployeesService;
  public get _employees(): EmployeesService {
    if (!this.employeesService) {
      this.employeesService = this.injector.get(EmployeesService);
    }
    return this.employeesService;
  }

  constructor(private injector: Injector, private snackBar: MatSnackBar) {}

  openSnackBar(message, button) {
    this.snackBar.open(message, button, { verticalPosition: 'bottom', horizontalPosition: 'end', duration: 3000 });
  }

  // ************* SERVICES *************
  /**
   * GET all services
   *
   * @returns an observable of services
   */
  getServicesList(): Observable<ServiceModel[]> {
    return this._services.getAll();
  }

  /**
   * POST a service
   *
   * @param payload of ServiceModel type
   * @returns an observable of the added service
   */
  addService(payload: ServiceModel): Observable<ServiceModel> {
    return this._services.post(payload);
  }

  /**
   * UDPATE a service
   *
   * @param payload of ServiceModel type
   * @returns an observable of the updated service
   */
  updateService(payload: ServiceModel): Observable<ServiceModel> {
    return this._services.put(payload);
  }

  /**
   * DELETE a service
   *
   * @param payload string
   * @returns an string of the updated service
   */
  deleteService(payload: string): Observable<string> {
    return this._services.delete(payload);
  }
  // ************* SERVICES *************

  // ************* EMPLOYEES *************
  /**
   * GET all employees
   *
   * @returns an observable of employees
   */
  getEmployeesList(): Observable<EmployeeModel[]> {
    return this._employees.getAll();
  }

  /**
   * POST a employee
   *
   * @param payload of EmployeeModel type
   * @returns an observable of the added employee
   */
  addEmployee(payload: EmployeeModel): Observable<EmployeeModel> {
    return this._employees.post(payload);
  }

  /**
   * UPDATE a employee
   *
   * @param payload of EmployeeModel type
   * @returns an observable of the updated employee
   */
  updateEmployee(payload: EmployeeModel): Observable<EmployeeModel> {
    return this._employees.put(payload);
  }

  /**
   * DELETE a employee
   *
   * @param payload of EmployeeModel type
   * @returns an string of the updated employee
   */
  deleteEmployee(payload: string): Observable<string> {
    return this._employees.delete(payload);
  }
  // ************* EMPLOYEES *************
}
