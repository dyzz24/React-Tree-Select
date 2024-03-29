import { TreeSelectItems } from '../types';
import { Actions } from './actions.ts';

export interface State {
  tree: TreeSelectItems[]
  selectedIds: string[]
  lastAction: Actions | null
  isInit: boolean
  isSearchMode?: boolean
}

export const initialState: State = {
  tree: [],
  selectedIds: [],
  lastAction: null,
  isInit: false,
  isSearchMode: false
}
