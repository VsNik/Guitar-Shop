import {State} from '../index';
import {SliceName} from '../../constanst/common';

export const selectSorting = (state: State) => state[SliceName.Filters].sort;
export const selectDirection = (state: State) => state[SliceName.Filters].direction;
export const selectType = (state: State) => state[SliceName.Filters].type;
export const selectStringCount = (state: State) => state[SliceName.Filters].strings;
