import React from 'react';
import { type State } from '../reducer/state.ts';
import { type Actions } from '../reducer/actions.ts';

/** Creates new React.Context in passed generik type */
export const createGenericContext = <T, >() => {
  const genericContext = React.createContext<T | undefined>(undefined);
  const useGenericContext = () => {
    const contextIsDefined = React.useContext(genericContext);
    return contextIsDefined;
  };

  return [useGenericContext, genericContext.Provider, genericContext.Consumer] as const;
};

export const [
  useTreeSelectContext,
  TreeSelectProvider
] = createGenericContext<{ state: State, dispatch: React.Dispatch<Actions | Actions[]> } | null>();
