import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { LoadServices } from '../_store/actions/services.actions';
import { ServiceModel } from '../_models/ServiceModel';
import { LoadEmployees } from '../_store/actions/employees.actions';
import { EmployeeModel } from '../_models/EmployeeModel';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EmployeesComponent } from './employees/employees.component';
import { ServicesComponent } from './services/services.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, OnDestroy {
  public currentLanguage: string;
  public allEmployees: boolean;

  public servicesArray: ServiceModel[];
  public employeesArray: EmployeeModel[];

  public auxEmployeesArray = new FormArray([]);
  public auxServicesArray = new FormArray([]);

  private onDestroySubscribe: Subject<void> = null;

  constructor(
      private store: Store<AppState>,
      private authenticationService: AuthenticationService,
      private translateService: TranslateService,
      public dialog: MatDialog
    ) {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.addLangs(['en', 'pt-BR']);
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|pt-BR/) ? browserLang : 'pt-BR');
    this.currentLanguage = browserLang.match(/en|pt-BR/) ? browserLang : 'pt-BR';
  }

  ngOnInit() {
    this.store.dispatch(new LoadServices());
    this.store.dispatch(new LoadEmployees());
    this.store.select(store => store.services.data).pipe(takeUntil(this.getUnsubscriber())).subscribe((services: ServiceModel[]) => {
      this.servicesArray = services;
    });
    this.store.select(store => store.employees.data).pipe(takeUntil(this.getUnsubscriber())).subscribe((employees: EmployeeModel[]) => {
      this.employeesArray = employees;
    });
  }

  get auxSelectedEmployees() {
    return this.auxEmployeesArray;
  }

  get auxSelectedServices() {
    return this.auxServicesArray;
  }

  changeLanguage(evt) {
    this.currentLanguage = evt;
    this.translateService.use(evt);
  }

  editEmployees() {
    this.dialog.open(EmployeesComponent, {
      height: '95%',
      width: '1200px'
    });
  }

  editServices() {
    this.dialog.open(ServicesComponent, {
      height: '95%',
      width: '1200px'
    });
  }

  onChangeSelectedEmployees(event) {
    if (event.checked) {
      this.auxSelectedEmployees.push(new FormControl(event.source.value));
    } else {
      const i = this.auxSelectedEmployees.controls.findIndex(x => x.value === event.source.value);
      this.auxSelectedEmployees.removeAt(i);

      if (this.employeesArray.length !== 0) {
        const removedControl = this.employeesArray.findIndex(
          item => item._id === event.source.value.id
        );
        if (removedControl !== -1) {
          this.employeesArray.splice(removedControl, 1);
        }
      }
    }
  }

  onChangeSelectedServices(event) {
    if (event.checked) {
      this.auxSelectedServices.push(new FormControl(event.source.value));
    } else {
      const i = this.auxSelectedServices.controls.findIndex(x => x.value === event.source.value);
      this.auxSelectedServices.removeAt(i);

      if (this.servicesArray.length !== 0) {
        const removedControl = this.servicesArray.findIndex(
          item => item._id === event.source.value.id
        );
        if (removedControl !== -1) {
          this.servicesArray.splice(removedControl, 1);
        }
      }
    }
  }

  logout() {
    this.authenticationService.logout();
  }

  getUnsubscriber(): Subject<void> {
    if (!this.onDestroySubscribe) {
      this.onDestroySubscribe = new Subject<void>();
    }
    return this.onDestroySubscribe;
  }

  ngOnDestroy(): void {
    if (this.onDestroySubscribe) {
      this.onDestroySubscribe.next();
      this.onDestroySubscribe.complete();
    }
  }
}
