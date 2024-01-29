import React, { useEffect } from 'react';

import styles from './tree-select-root.module.pcss';

import { Actions } from '@reducer/actions.ts';
import { useTreeSelectContext } from '@reducer/index.ts';
import { TreeNode } from '@components/tree-node/tree-node.tsx';
import { searchTreeItem } from '@utils/utils.ts';
import { BaseComponentProps, onChangeCallback } from '../../types';

type Props = BaseComponentProps & {
  onChange: onChangeCallback
}
export const TreeSelectRoot: React.FC<Props> = (props) => {
  const { state, dispatch } = useTreeSelectContext();

  useEffect(() => {
    if (state.lastAction === Actions.SELECT || state.lastAction === Actions.UNSELECT) {
      props.onChange({ selectedIds: state.selectedIds, updatedTree: state.tree });
    }
  }, [state]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  return <div className={styles.rootContainer}>
        {!props.hideSearchInput && <input className={styles.searchInput} onChange={onChange}/>}
        <div className={styles.treeRender}>
            {state?.tree.map(el => <TreeNode node={el} key={el.id} {...props}/>)}
        </div>
    </div>
}
