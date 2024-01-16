import { type TreeSelectItems } from '../types/treeSelectProps.ts';

export interface State {
  items: TreeSelectItems[]
}

export const initialState: State = {
  items: []
}
