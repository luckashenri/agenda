import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ServiceModel } from 'src/app/_models/ServiceModel';
import { Validators, FormBuilder } from '@angular/forms';
import { AddService, UpdateService, RemoveService } from '../../_store/actions/services.actions';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  private onDestroySubscribe: Subject<void> = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'actions'];
  public panelOpenState: boolean;

  public isEditing: boolean;
  public editingRow: ServiceModel;
  public dataArray: ServiceModel[];

  public form = this.fb.group({
    _id: [null],
    name: [null, Validators.required]
  });

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServicesComponent>,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.store.select(store => store.services.data).pipe(takeUntil(this.getUnsubscriber())).subscribe((services: ServiceModel[]) => {
      this.dataArray = services;
      this.dataSource = new MatTableDataSource(services);
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
    if (payload._id) {
      console.log('EDITING');
      this.store.dispatch(new UpdateService(payload));
      this.dataArray.unshift(this.form.value);
      this.dataSource = new MatTableDataSource(this.dataArray);
      this.applyTableConfig();
      this.editingRow = null;
      this.isEditing = false;
      this.resetForm();
    } else {
      console.log('POSTING');
      delete payload._id;
      this.store.dispatch(new AddService(payload));
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

  deleteService(_id: string) {
    this.store.dispatch(new RemoveService(_id));
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
