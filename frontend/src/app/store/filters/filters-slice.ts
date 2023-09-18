import {createSlice} from '@reduxjs/toolkit';
import {GuitarType} from '@guitar-shop/lib/types';
import {SliceName} from '../../constanst/common';
import {SortDirection, SortingType, StringCount} from '../../types/common';

export interface FiltersState {
  sort: SortingType;
  direction: SortDirection;
  type: GuitarType[];
  strings: StringCount[];
}

const initialState: FiltersState = {
  sort: SortingType.Date,
  direction: SortDirection.Desc,
  type: [],
  strings: [],
}

export const filtersSlice = createSlice({
  name: SliceName.Filters,
  initialState,
  reducers: {
    setSorting: (state, action) => {
      state.sort = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setType: (state, action) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      } else {
        state.type = state.type.filter((item) => item !== action.payload)
      }
    },
    setStringCount: (state, action) => {
      if (!state.strings.includes(action.payload)) {
        state.strings.push(action.payload);
      } else {
        state.strings = state.strings.filter((item) => item !== action.payload)
      }
    },
    resetFilters: (state) => {
      state.type = [];
      state.strings = [];
    }
  }
});

export const {setSorting, setDirection, setType, setStringCount, resetFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
