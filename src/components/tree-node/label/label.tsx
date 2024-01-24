import { type BaseComponentProps, type TreeSelectItems } from '../../../types/treeSelectProps.ts';

import { Actions } from '@reducer/actions.ts';
import React from 'react';
import styles from './label.module.pcss';
import classNames from 'classnames';
import { useTreeSelectContext } from '@reducer/index.ts';

type Props = BaseComponentProps & {
  node: TreeSelectItems
  hasChildren: boolean
}
export const Label: React.FC<Props> = ({
  node, hasChildren, renderIconBefore,
  renderIconAfter, hideCheckbox
}) => {
  const { dispatch, state } = useTreeSelectContext();

  const onSelectHandler = () => {
    dispatch({ type: Actions.SELECT, id: node.id, value: !node.selected });
  }

  const labelContent = () => <>
        {renderIconBefore && <span>{renderIconBefore}</span>}
        {node.label}
        {renderIconAfter && <span>{renderIconAfter}</span>}
    </>

  if (hideCheckbox) {
    return <span className={classNames(styles.label, node.selected && styles.active,
      hasChildren && styles.hasChildren, state.isSearchMode && node.filtered && styles.target
    )} onClick={onSelectHandler}>{labelContent()}</span>
  }

  return <label className={classNames(styles.label, node.selected && styles.active,
    hasChildren && styles.hasChildren, state.isSearchMode && node.filtered && styles.target
  )}><input type={'checkbox'} checked={node.selected}
              onChange={onSelectHandler}/>
        {labelContent()}
    </label>
}
