import React, { useEffect } from 'react';

import styles from './tree-select-root.module.pcss';

import { Actions } from '@reducer/actions.ts';
import { useTreeSelectContext } from '@reducer/index.ts';
import { TreeNode } from '@components/tree-node/tree-node.tsx';
import { searchTreeItem } from '@utils/utils.ts';
import { BaseComponentProps, onChangeCallback } from '../../types';

type Props = BaseComponentProps & {
  onChange: onChangeCallback
  loading?: boolean
}
export const TreeSelectRoot: React.FC<Props> = (props) => {
  const { state, dispatch } = useTreeSelectContext();
  const [loading, setLoading] = React.useState(props.loading ?? false);

  useEffect(() => {
    if (props?.loading !== undefined) setLoading(props.loading);
  }, [props?.loading])

  useEffect(() => {
    if (state.lastAction === Actions.SELECT || state.lastAction === Actions.UNSELECT) {
      props.onChange({ selectedIds: state.selectedIds, updatedTree: state.tree });
    }
  }, [state]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const editedTree = searchTreeItem(state.tree, e.target.value);
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

  const renderContent = () => loading
    ? <div className={styles.spinnerWrapper}>
            <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    : state?.tree.map(el => <TreeNode node={el} key={el.id} {...props}/>)

  return <div className={styles.rootContainer}>
        {!props.hideSearchInput && <input className={styles.searchInput} onChange={onChange}/>}
        <div className={styles.treeRender}>
            {renderContent()}
        </div>
    </div>
}
