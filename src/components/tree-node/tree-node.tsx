import React from 'react';

import styles from './tree-node.module.pcss';

import { Label } from '@components/tree-node/label/label.tsx';
import { Expander } from '@components/tree-node/expander/expander.tsx';
import { useTreeSelectContext } from '@reducer/index.ts';
import classNames from 'classnames';
import { type BaseComponentProps, type TreeSelectItems } from '../../types';

type Props = BaseComponentProps & {
  node: TreeSelectItems
}
export const TreeNode: React.FC<Props> = (props) => {
  const { state } = useTreeSelectContext();

  const hasChildren = props.node?.children && props.node?.children?.length > 0;
  if (state.isSearchMode && (!props.node.filtered && !props.node.expanded)) return null;

  return <div className={classNames(styles.container, !hasChildren && styles.empty)}>
        <div className={styles.title}>
            <Expander node={props.node} hasChildren={!!hasChildren}/>
            <Label hasChildren={!!hasChildren} {...props}/>
        </div>
        {props.node?.expanded && props.node?.children?.map((child) =>
            <TreeNode {...props} key={child.id} node={child}/>)
        }
    </div>
}
