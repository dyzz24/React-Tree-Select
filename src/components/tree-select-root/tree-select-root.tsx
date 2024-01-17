import React, { useEffect } from 'react';
import { useTreeSelectContext } from '../../context/context.tsx';

import styles from './tree-select-root.module.pcss';
import { Actions } from '../../reducer';
import { type onChangeCallback } from '../../types/treeSelectProps.ts';
import { TreeNode } from '@components/tree-node/tree-node.tsx';

export const TreeSelectRoot: React.FC<{ onChange: onChangeCallback }> = ({ onChange }) => {
  const { state } = useTreeSelectContext();

  useEffect(() => {
    if (state.lastAction === Actions.SELECT || state.lastAction === Actions.UNSELECT) {
      onChange({ selectedIds: state.selectedIds, updatedTree: state.tree });
    }
  }, [state]);

  return <div className={styles.rootContainer}>{state?.tree.map(el => <TreeNode node={el} key={el.id}/>)}</div>
}
