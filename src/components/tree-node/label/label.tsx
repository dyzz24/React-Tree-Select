import { type TreeSelectItems } from '../../../types/treeSelectProps.ts';

import { Actions } from '@reducer/actions.ts';
import React from 'react';
import styles from './label.module.pcss';
import classNames from 'classnames';
import { useTreeSelectContext } from '@reducer/index.ts';

type Props = {
  node: TreeSelectItems
  hasChildren: boolean
}
export const Label: React.FC<Props> = ({ node, hasChildren }) => {
  const { dispatch } = useTreeSelectContext();

  const onSelectHandler = () => {
    dispatch({ type: Actions.SELECT, id: node.id, value: !node.selected });
  }

  return <label className={classNames(styles.label, node.selected && styles.active,
    hasChildren && styles.hasChildren
  )}><input type={'checkbox'} checked={node.selected} onChange={onSelectHandler}/>{node.label}</label>
}
