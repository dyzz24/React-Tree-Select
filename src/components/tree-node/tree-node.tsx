import React from 'react';
import type { TreeSelectItems } from '../../types/treeSelectProps.ts';

import styles from './tree-node.module.pcss';

import { Label } from '@components/tree-node/label/label.tsx';
import { Expander } from '@components/tree-node/expander/expander.tsx';

export const TreeNode: React.FC<{ node: TreeSelectItems }> = ({ node }) => {
  // const { dispatch } = useTreeSelectContext();

  const hasChildren = node?.children && node?.children?.length > 0;

  return <div className={styles.container}>
        <div className={styles.title}>
            <Expander node={node} hasChildren={!!hasChildren}/>
            <Label node={node} hasChildren={!!hasChildren}/>
        </div>
        {node?.expanded && node?.children?.map((child) =>
            <TreeNode key={child.id} node={child}/>)
        }
    </div>
}
