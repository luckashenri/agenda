import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { EmployeeModel } from 'src/app/_models/EmployeeModel';
import { Validators, FormBuilder } from '@angular/forms';
import { AddEmployee, UpdateEmployee, RemoveEmployee } from '../../_store/actions/employees.actions';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  private onDestroySubscribe: Subject<void> = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'phone', 'actions'];
  public panelOpenState: boolean;

  public isEditing: boolean;
  public editingRow: EmployeeModel;
  public dataArray: EmployeeModel[];

  public form = this.fb.group({
    _id: [null],
    name: [null, Validators.required],
    phone: [null, Validators.required]
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeesComponent>,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.store.select(store => store.employees.data).pipe(takeUntil(this.getUnsubscriber())).subscribe((employees: EmployeeModel[]) => {
      this.dataArray = employees;
      this.dataSource = new MatTableDataSource(employees);
      this.applyTableConfig();
    });
  }

  get name() {
    return this.form.get('name');
  }

  get phone() {
    return this.form.get('phone');
  }

  public applyTableConfig() {
    this.dataSource.sort = this.sort;
  }

  submitForm() {
    const payload = this.form.value;
    payload.phone = payload.phone.toString();
    if (payload._id) {
      console.log('EDITING');
      this.store.dispatch(new UpdateEmployee(payload));
      this.dataArray.unshift(this.form.value);
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.applyTableConfig();
      this.editingRow = null;
      this.isEditing = false;
      this.resetForm();
    } else {
      console.log('POSTING');
      delete payload._id;
      this.store.dispatch(new AddEmployee(payload));
    }
  }

  editRow(element) {
    this.form.patchValue(element);

    if (!this.panelOpenState) {
      this.panelOpenState = true;
    }

    this.isEditing = true;
    this.editingRow = element;
    const index: number = this.dataArray.findIndex(d => d._id === element._id);
    this.dataArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.dataArray);
    this.applyTableConfig();
  }

  cancelEdition() {
    if (this.panelOpenState) {
      this.panelOpenState = false;
    }
    this.dataArray.unshift(this.editingRow);
    this.dataSource = new MatTableDataSource(this.dataArray);
    this.applyTableConfig();
    this.editingRow = null;
    this.isEditing = false;
    this.resetForm();
  }

  deleteEmployee(_id: string) {
    this.store.dispatch(new RemoveEmployee(_id));
  }

  resetForm() {
    this.form.reset();
  }

  getUnsubscriber(): Subject<void> {
    if (!this.onDestroySubscribe) {
      this.onDestroySubscribe = new Subject<void>();
    }
    return this.onDestroySubscribe;
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.onDestroySubscribe) {
      this.onDestroySubscribe.next();
      this.onDestroySubscribe.complete();
    }
  }
}
