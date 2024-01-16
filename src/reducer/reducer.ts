import { Actions } from './actions.ts';
import { type State } from './state.ts';
import { editTreeItems } from '../utils/utils.ts';
import { type TreeItemValues } from '../types/treeSelectProps.ts';

export interface ReducerAction {
  type: Actions
  id: string
  value: TreeItemValues
}

export const reducer = (state: State, data: ReducerAction | ReducerAction[]) => {
  let modifiedState: Partial<State> = {};

  const reducerData = Array.isArray(data) ? data : [data];

  reducerData.forEach((actionData) => {
    switch (actionData.type) {
      case Actions.EXPAND:
        modifiedState = {
          ...modifiedState,
          items: editTreeItems(state.items, actionData.id, 'expanded', actionData.value)
        };
        break;

      case Actions.SELECT:
        modifiedState = {
          ...modifiedState,
          items: editTreeItems(state.items, actionData.id, 'selected', actionData.value),
          selectedIds: actionData.value
            ? [...state.selectedIds, actionData.id]
            : state.selectedIds.filter((id) => id !== actionData.id),
          lastAction: Actions.SELECT
        };
        break;

      default:
        throw new Error('Unsupported action ');
    }
  });

  return {
    ...state,
    ...modifiedState
  };
};
