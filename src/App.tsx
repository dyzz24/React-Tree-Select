import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { TreeSelectProvider } from './context/context.tsx';
import { type TreeSelectProps } from './types/treeSelectProps.ts';
import { TreeSelectRoot } from './components/tree-select-root/tree-select-root.tsx';
import { reducer } from './reducer/reducer.ts';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './App.module.pcss';
import { initialState } from './reducer/state.ts';
import { Actions } from './reducer/actions.ts';
import { prepareTree } from './utils/utils.ts';

const App: React.FC<TreeSelectProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.isInit && props.tree?.length) {
      const init = {
        tree: prepareTree(props.tree, props.selectedIds ?? []),
        selectedIds: props.selectedIds ?? [],
        lastAction: null,
        isInit: true
      };
      dispatch({ type: Actions.INIT, initState: init, id: '', value: '' });
    }
  }, [state.isInit]);

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
                    <TreeSelectRoot onChange={props.onChange}/>
                </TreeSelectProvider>
            </div>,
            node
    );
  } else return null;
}
export default App
