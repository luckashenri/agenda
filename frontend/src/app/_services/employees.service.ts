import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../_models/EmployeeModel';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${environment.api_url}/api/employees`);
  }

  post(payload: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.api_url}/api/employees`, payload);
  }

  put(payload: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(`${environment.api_url}/api/employees/${payload._id}`, payload);
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.api_url}/api/employees/${id}`);
  }
}
