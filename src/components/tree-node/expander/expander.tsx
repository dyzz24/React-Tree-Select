import { type TreeSelectItems } from '../../../types/treeSelectProps.ts';

import { Actions } from '@reducer/actions.ts';
import React from 'react';
import styles from './expander.module.pcss';
import { useTreeSelectContext } from '@reducer/index.ts';

import Arrow from '../../../assets/icons/arrow.svg?react'
import classNames from 'classnames';

type Props = {
  node: TreeSelectItems
  hasChildren: boolean
}
export const Expander: React.FC<Props> = ({ node, hasChildren }) => {
  const { dispatch } = useTreeSelectContext();

  const onExpandHandler = () => {
    dispatch({ type: Actions.EXPAND, id: node.id, value: !node.expanded });
  }

  return <>{hasChildren && <span className={classNames(styles.expander)}
                                   onClick={onExpandHandler}><span
        className={classNames(node.expanded && styles.active)}><Arrow/></span></span>}
    </>
}
