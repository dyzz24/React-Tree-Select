import React, { useEffect } from 'react';

import styles from './tree-select-root.module.pcss';

import { type onChangeCallback } from '../../types/treeSelectProps.ts';

import { Actions } from '@reducer/actions.ts';
import { useTreeSelectContext } from '@reducer/index.ts';
import { TreeNode } from '@components/tree-node/tree-node.tsx';
import { searchTreeItem } from '@utils/utils.ts';

export const TreeSelectRoot: React.FC<{ onChange: onChangeCallback }> = ({ onChange }) => {
  const { state, dispatch } = useTreeSelectContext();

  useEffect(() => {
    if (state.lastAction === Actions.SELECT || state.lastAction === Actions.UNSELECT) {
      onChange({ selectedIds: state.selectedIds, updatedTree: state.tree });
    }
  }, [state]);

  return <div className={styles.rootContainer}>
        <input onChange={(e) => {
          if (e.target.value) {
            const editedTree = searchTreeItem(state.tree, e.target.value);
            console.log(editedTree)
            dispatch([{ type: Actions.SET_TREE, id: '', value: editedTree },
              {
                type: Actions.SET_SEARCH_MODE,
                id: '',
                value: true
              }
            ]);
          } else {
            dispatch([
              {
                type: Actions.SET_SEARCH_MODE,
                id: '',
                value: false
              }
            ]);
          }
        }}/>
        <div className={styles.treeRender}>
            {state?.tree.map(el => <TreeNode node={el} key={el.id}/>)}
        </div>
    </div>
}
