import { useReducer, useCallback } from 'react';

export const FilterActions = {
  CONTROL_CHANGED: 'CONTROL_CHANGED',
  SET_FILTER: 'SET_FILTER',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
  SET_VALUES: 'SET_VALUES',
  SET_FIRST_COLOR: 'SET_FIRST_COLOR',
  SET_SECOND_COLOR: 'SET_SECOND_COLOR',
} as const;

type FilterActionsType = typeof FilterActions;
type FilterActionsKey = keyof FilterActionsType;

type FilterValues = number[];
type Action = { type: FilterActionsKey; payload: any };

type FilterState = {
  values: FilterValues;
  filter: FilterValues | string;
  applyFilter: boolean;
  colorOne: FilterValues[];
  colorTwo: FilterValues[];
};

export const NONE: FilterValues = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

const filterInitialState: FilterState = {
  values: NONE,
  filter: NONE,
  applyFilter: true,
  colorOne: null,
  colorTwo: null,
};

function filtersReducer(state = filterInitialState, action: Action): FilterState {
  switch (action.type) {
    case 'CONTROL_CHANGED':
      const newValues = [...state.values];
      newValues[action.payload.index] = action.payload.value;

      return {
        ...state,
        values: newValues,
        filter: newValues,
      };

    case 'TOGGLE_FILTER':
      return {
        ...state,
        applyFilter: action.payload,
      };

    case 'SET_VALUES':
      return {
        ...state,
        values: action.payload,
      };

    case 'SET_FIRST_COLOR':
      return {
        ...state,
        colorOne: action.payload,
      };

    case 'SET_SECOND_COLOR':
      return {
        ...state,
        colorTwo: action.payload,
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

const useFiltersReducer = (): [FilterState, (action: Action) => void] => {
  const [state, dispatch] = useReducer(filtersReducer, filterInitialState);

  return [state, dispatch];
};

type OnControlChangeFunc = (index: number, value: string) => void;
type ApplyFiltersFunc = (apply: boolean) => void;
type SetValuesFunc = (values: number[]) => void;
type SetFirstColorFunc = (values: number[]) => void;
type SetSecondColorFunc = (values: number[]) => void;
type SetFilterFunc = (filter: number[] | string) => void;

const useFilters = (): [
  FilterState,
  OnControlChangeFunc,
  ApplyFiltersFunc,
  SetValuesFunc,
  SetFirstColorFunc,
  SetSecondColorFunc,
  SetFilterFunc,
] => {
  const [state, dispatch] = useFiltersReducer();

  const onControlChange: OnControlChangeFunc = useCallback(
    (index: number, value: string) => dispatch({ type: FilterActions.CONTROL_CHANGED, payload: { index, value } }),
    [],
  );

  const applyFilters: ApplyFiltersFunc = useCallback(
    (apply: boolean) => dispatch({ type: FilterActions.TOGGLE_FILTER, payload: apply }),
    [],
  );

  const setValues: SetValuesFunc = useCallback(
    (values: number[]) => dispatch({ type: FilterActions.SET_VALUES, payload: values }),
    [],
  );

  const setFirstColor: SetFirstColorFunc = useCallback(
    (values: number[]) => dispatch({ type: FilterActions.SET_FIRST_COLOR, payload: values }),
    [],
  );

  const setSecondColor: SetSecondColorFunc = useCallback(
    (values: number[]) => dispatch({ type: FilterActions.SET_SECOND_COLOR, payload: values }),
    [],
  );

  const setFilter: SetFilterFunc = useCallback(
    (filter: number[] | string) => dispatch({ type: FilterActions.SET_FILTER, payload: filter }),
    [],
  );

  return [state, onControlChange, applyFilters, setValues, setFirstColor, setSecondColor, setFilter];
};

export default useFilters;
