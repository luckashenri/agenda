import { ServicesActions, ServicesActionTypes } from '../actions/services.actions';

const initialServicesState: ServicesState = {
  data: [],
  loading: false,
  error: undefined
};

export interface ServicesState {
  data: any[];
  loading: boolean;
  error: Error;
}

export function servicesReducer(state: ServicesState = initialServicesState, action: ServicesActions) {
  switch (action.type) {
    // LOAD FROM API
    case ServicesActionTypes.LOAD_SERVICES:
      return { ...state, loading: true };
    case ServicesActionTypes.LOAD_SERVICES_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ServicesActionTypes.LOAD_SERVICES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // ADD
    case ServicesActionTypes.ADD_SERVICE:
      return { ...state, loading: true };

    case ServicesActionTypes.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case ServicesActionTypes.ADD_SERVICE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // UPDATE
    case ServicesActionTypes.UPDATE_SERVICE:
      return { ...state, loading: true };

    case ServicesActionTypes.UPDATE_SERVICE_SUCCESS:
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
    case ServicesActionTypes.REMOVE_SERVICE_SUCCESS:
      return { ...state, data: state.data.filter(item => item._id !== action.payload), loading: false };
    case ServicesActionTypes.REMOVE_SERVICE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
