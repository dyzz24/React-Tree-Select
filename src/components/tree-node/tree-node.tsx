import React from 'react';
import type { TreeSelectItems } from '../../types/treeSelectProps.ts';

import styles from './tree-node.module.pcss';
import { useTreeSelectContext } from '../../context/context.tsx';
import { Actions } from '../../reducer/actions.ts';
import classNames from 'classnames';

export const TreeNode: React.FC<{ node: TreeSelectItems }> = ({ node }) => {
  const { dispatch } = useTreeSelectContext();

  const hasChildren = node?.children && node?.children?.length > 0;

  const onExpandHandler = () => {
    dispatch({ type: Actions.EXPAND, id: node.id, value: !node.expanded });
  }

  const onSelectHandler = () => {
    dispatch({ type: Actions.SELECT, id: node.id, value: !node.selected });
  }

  return <div className={styles.container}>
        <div className={styles.title}>
            {hasChildren && <span className={styles.expander} onClick={onExpandHandler}>{
                node?.expanded ? '-' : '+'
            }</span>}
            <label className={classNames(styles.label, node.selected && styles.active, hasChildren && styles.hasChildren
            )}>
                <input type={'checkbox'} checked={node.selected} onChange={onSelectHandler}/>
                {node.label}</label>
        </div>
        {node?.expanded && node?.children?.map((child) =>
            <TreeNode key={child.id} node={child}/>)
        }
    </div>
}
