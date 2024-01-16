import { type TreeSelectItems } from '../types/treeSelectProps.ts';
import { type Actions } from './actions.ts';

export interface State {
  items: TreeSelectItems[]
  selectedIds: string[]
  lastAction: Actions | null
}

export const initialState: State = {
  items: [],
  selectedIds: [],
  lastAction: null
}
