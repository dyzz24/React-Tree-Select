import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import type { TreeSelectItems, TreeSelectProps } from './types/treeSelectProps.ts';

const mockTree: TreeSelectItems[] = [{
  id: '1',
  alias: 'root',
  label: 'Root Node',
  children: [
    {
      id: '1.1',
      alias: 'child1.1',
      label: 'Child Node 1.1',
      children: [
        {
          id: '1.1.1',
          alias: 'chil11',
          label: 'Child Node 1.1.1',
          children: [
            {
              id: '1.1.1.1',
              alias: 'child12',
              label: 'Child Node 1.1.1.1',
              children: null
            },
            {
              id: '1.1.1.2',
              alias: 'child4',
              label: 'Child Node 1.1.1.2',
              children: null
            }
          ]
        }
      ]
    },
    {
      id: '1.2',
      alias: 'child2',
      label: 'Child Node 1.2',
      children: []
    }
  ]
}];

const mockProps: TreeSelectProps = {
  tree: mockTree
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<React.StrictMode>
    <>
        <div id="test"></div>
        <App tree={mockProps.tree} targetId={'test'} selectedIds={['1.2']}/>

    </>
</React.StrictMode>, document.getElementById('root'))
