import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react'

import { Actions, initialState, reducer, TreeSelectProvider } from './reducer';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { prepareTree, setHasSelectedChild } from '@utils/utils.ts';
import { TreeSelectRoot } from '@components/tree-select-root/tree-select-root.tsx';

import './styles.pcss';

import styles from './react-tree-select.module.pcss';
import { TreeSelectProps } from './types';

export const ReactTreeSelect: React.FC<TreeSelectProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (!state.isInit && props.tree?.length) {
      const init = {
        tree: setHasSelectedChild(prepareTree(props.tree, props.selectedIds ?? []), !!props?.hideSelectedChildCount),
        selectedIds: props.selectedIds ?? [],
        lastAction: null,
        isInit: true
      };
      dispatch({ type: Actions.INIT, initState: init, id: '', value: '' });
    }
  }, [state.isInit]);

  const [node, setNode] = useState<Element | null>(null);

  const createContainer = () => {
    const target = props.targetNodeId ?? 'tree-select-container';
    const node = document.getElementById(target);
    if (!node) {
      const containerDomNode = document.createElement('div') as Element;
      containerDomNode.id = target;
      document.body.appendChild(containerDomNode);
      setNode(containerDomNode);
    } else setNode(node);
  };

  useLayoutEffect(() => {
    createContainer();
  }, []);

  if (node) {
    return ReactDOM.createPortal(
            <div className={classNames(styles.main, props.className)}>
                <TreeSelectProvider value={{ state, dispatch }}>
                    <TreeSelectRoot {...props} />
                </TreeSelectProvider>
            </div>,
            node
    );
  } else return null;
}
