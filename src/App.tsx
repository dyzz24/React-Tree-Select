import React, { useEffect, useReducer, useState } from 'react'
import { TreeSelectProvider } from './context/context.tsx';
import { type TreeSelectProps } from './types/treeSelectProps.ts';
import { TreeSelectRoot } from './components/tree-select-root/tree-select-root.tsx';
import { reducer } from './reducer/reducer.ts';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const App: React.FC<TreeSelectProps> = (props) => {
  const itemsList = props.items;
  const initialState = { items: itemsList };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [node, setNode] = useState<Element | null>(null);

  const createContainer = () => {
    const node = document.getElementById('r-tree-select-container');
    if (!node) {
      const containerDomNode = document.createElement('div') as Element;
      containerDomNode.id = 'r-tree-select-container';
      document.body.appendChild(containerDomNode);
      setNode(containerDomNode);
    }
  };

  useEffect(() => {
    createContainer();
  }, []);

  if (node) {
    return ReactDOM.createPortal(
            <div className={classNames(props.className)}>
                <TreeSelectProvider value={{ state, dispatch }}>
                    <TreeSelectRoot/>
                </TreeSelectProvider>
            </div>,
            node
    );
  } else return null;
}
export default App
