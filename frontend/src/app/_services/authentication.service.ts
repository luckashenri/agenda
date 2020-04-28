import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CredentialModel } from '../_models/credential';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<CredentialModel>(JSON.parse(localStorage.getItem('agenda')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.api_url}/api/auth`, { email, password }).pipe(
      map(res => {
        localStorage.setItem('agenda', JSON.stringify(res));
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('agenda');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}
