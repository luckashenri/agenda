import { ServicesState } from './_store/reducers/services.reducer';
import { EmployeesState } from './_store/reducers/employees.reducer';

export interface AppState {
  readonly services: ServicesState;
  readonly employees: EmployeesState;
}
