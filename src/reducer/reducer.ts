import { Actions } from './actions.ts';
import { type State } from './state.ts';

export const reducer = (state: State, data: Actions | Actions[]) => {
  let modifiedState: Partial<State> = {};

  const reducerData = Array.isArray(data) ? data : [data];

  reducerData.forEach((actionData: Actions) => {
    switch (actionData) {
      case Actions.EXPAND:
        modifiedState = {
          ...modifiedState
          // expanded: true
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
