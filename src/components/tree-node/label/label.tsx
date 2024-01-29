import { Actions } from '@reducer/actions.ts';
import React from 'react';
import styles from './label.module.pcss';
import classNames from 'classnames';
import { useTreeSelectContext } from '@reducer/index.ts';
import { type BaseComponentProps, type TreeSelectItems } from '../../../types';

type Props = BaseComponentProps & {
  node: TreeSelectItems
  hasChildren: boolean
}
export const Label: React.FC<Props> = ({
  node, hasChildren, renderIconBefore,
  renderIconAfter, hideCheckbox, hideSelectedChildCount
}) => {
  const { dispatch, state } = useTreeSelectContext();

  const onSelectHandler = () => {
    dispatch({
      type: Actions.SELECT,
      id: node.id,
      value: !node.selected,
      optionalHideSelectedChildCount: hideSelectedChildCount
    });
  }
  const labelContent = () => <>
        {renderIconBefore && <span className={styles.labelChild}>{renderIconBefore}</span>}
        {node.label}
        {renderIconAfter && <span className={styles.labelChild}>{renderIconAfter}</span>}
        {!hideSelectedChildCount && !!node?.hasSelectedChild && node.hasSelectedChild > 0 &&
            <span className={styles.hasSelectedChild}>{node.hasSelectedChild}✔</span>}
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
