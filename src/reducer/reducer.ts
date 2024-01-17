import { Actions } from './actions.ts';
import { type State } from './state.ts';
import { editTreeItems } from '../utils/utils.ts';
import { type TreeItemValues } from '../types/treeSelectProps.ts';

export interface ReducerAction {
  type: Actions
  id: string
  value: TreeItemValues
  initState?: State
}

export const reducer = (state: State, data: ReducerAction | ReducerAction[]) => {
  let modifiedState: Partial<State> = {};

  const reducerData = Array.isArray(data) ? data : [data];

  reducerData.forEach((actionData) => {
    switch (actionData.type) {
      case Actions.EXPAND:
        modifiedState = {
          ...modifiedState,
          tree: editTreeItems(state.tree, actionData.id, 'expanded', actionData.value),
          lastAction: Actions.EXPAND
        };
        break;

      case Actions.SELECT:
        modifiedState = {
          ...modifiedState,
          tree: editTreeItems(state.tree, actionData.id, 'selected', actionData.value),
          selectedIds: actionData.value
            ? [...state.selectedIds, actionData.id]
            : state.selectedIds.filter((id) => id !== actionData.id),
          lastAction: actionData.value ? Actions.SELECT : Actions.UNSELECT
        };
        break;

      case Actions.INIT:
        modifiedState = {
          ...actionData.initState
        };
        break;

      default:
        throw new Error('Unsupported action ');
    }
  });
  console.log(' v modifiedState ', modifiedState)
  return {
    ...state,
    ...modifiedState
  };
};
