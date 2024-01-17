import React, { useEffect } from 'react';
import { useTreeSelectContext } from '../../context/context.tsx';
import { TreeNode } from '../tree-node/tree-node.tsx';

import styles from './tree-select-root.module.pcss';
import { Actions } from '../../reducer/actions.ts';

export const TreeSelectRoot = () => {
  const { state } = useTreeSelectContext();

  useEffect(() => {
    if (state.lastAction === Actions.SELECT || state.lastAction === Actions.UNSELECT) {
      console.log(state)
    }
  }, [state]);

  return <div className={styles.rootContainer}>{state?.tree.map(el => <TreeNode node={el} key={el.id}/>)}</div>
}
