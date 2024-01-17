import { type TreeSelectItems } from '../../../types/treeSelectProps.ts';
import { useTreeSelectContext } from '../../../context/context.tsx';
import { Actions } from '../../../reducer/actions.ts';
import React from 'react';
import styles from './expander.module.pcss';

type Props = {
  node: TreeSelectItems
  hasChildren: boolean
}
export const Expander: React.FC<Props> = ({ node, hasChildren }) => {
  const { dispatch } = useTreeSelectContext();

  const onExpandHandler = () => {
    dispatch({ type: Actions.EXPAND, id: node.id, value: !node.expanded });
  }

  return <>{hasChildren && <span className={styles.expander}
                                   onClick={onExpandHandler}>{node?.expanded ? '-' : '+'}</span>}
    </>
}
