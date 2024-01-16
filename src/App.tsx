import React, { useLayoutEffect, useReducer, useState } from 'react'
import { TreeSelectProvider } from './context/context.tsx';
import { type TreeSelectProps } from './types/treeSelectProps.ts';
import { TreeSelectRoot } from './components/tree-select-root/tree-select-root.tsx';
import { reducer } from './reducer/reducer.ts';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './App.module.pcss';
import { prepareTree } from './utils/utils.ts';

const App: React.FC<TreeSelectProps> = (props) => {
  const itemsList = prepareTree(props.items, props.selectedIds);

  const initialState = { items: itemsList, selectedIds: props.selectedIds ?? [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [node, setNode] = useState<Element | null>(null);

  const createContainer = () => {
    const target = props.targetId ?? 'tree-select-container';
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
            <div className={classNames(props.className, styles.container)}>
                <TreeSelectProvider value={{ state, dispatch }}>
                    <TreeSelectRoot/>
                </TreeSelectProvider>
            </div>,
            node
    );
  } else return null;
}
export default App
