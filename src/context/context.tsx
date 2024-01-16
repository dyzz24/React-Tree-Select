import React from 'react';
import { type State } from '../reducer/state.ts';
import { type ReducerAction } from '../reducer/reducer.ts';

/** Creates new React.Context in passed generik type */
export const createGenericContext = <T, >() => {
  const genericContext = React.createContext<T>({} as unknown as T);
  const useGenericContext = () => {
    const contextIsDefined = React.useContext(genericContext);
    return contextIsDefined;
  };

  return [useGenericContext, genericContext.Provider, genericContext.Consumer] as const;
};

export const [
  useTreeSelectContext,
  TreeSelectProvider
] = createGenericContext<{ state: State, dispatch: React.Dispatch<ReducerAction | ReducerAction[]> }>();
