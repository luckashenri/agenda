import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from '../_models/ServiceModel';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${environment.api_url}/api/services`);
  }

  post(payload: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(`${environment.api_url}/api/services`, payload);
  }

  put(payload: ServiceModel): Observable<ServiceModel> {
    return this.http.put<ServiceModel>(`${environment.api_url}/api/services/${payload._id}`, payload);
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.api_url}/api/services/${id}`);
  }
}
