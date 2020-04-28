import { EmployeesActions, EmployeesActionTypes } from '../actions/employees.actions';

const initialEmployeesState: EmployeesState = {
  data: [],
  loading: false,
  error: undefined
};

export interface EmployeesState {
  data: any[];
  loading: boolean;
  error: Error;
}

export function employeesReducer(state: EmployeesState = initialEmployeesState, action: EmployeesActions) {
  switch (action.type) {
    // LOAD FROM API
    case EmployeesActionTypes.LOAD_EMPLOYEES:
      return { ...state, loading: true };
    case EmployeesActionTypes.LOAD_EMPLOYEES_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case EmployeesActionTypes.LOAD_EMPLOYEES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // ADD
    case EmployeesActionTypes.ADD_EMPLOYEE:
      return { ...state, loading: true };

    case EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case EmployeesActionTypes.ADD_EMPLOYEE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // UPDATE
    case EmployeesActionTypes.UPDATE_EMPLOYEE:
      return { ...state, loading: true };

    case EmployeesActionTypes.UPDATE_EMPLOYEE_SUCCESS:
      const oldArray = state.data;
      const index = oldArray.findIndex((el: any) => el._id === action.payload._id);
      oldArray.splice(index, 1, action.payload);

      const newArray = oldArray.concat(action.payload);

      const uniqArray = new Set(newArray);
      const finalArray = Array.from(uniqArray);

      return {
        ...state,
        data: [...finalArray],
        loading: false
      };

    // REMOVE
    case EmployeesActionTypes.REMOVE_EMPLOYEE_SUCCESS:
      return { ...state, data: state.data.filter(item => item._id !== action.payload), loading: false };
    case EmployeesActionTypes.REMOVE_EMPLOYEE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
