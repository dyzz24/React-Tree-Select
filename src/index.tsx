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
      alias: 'child1',
      label: 'Child Node 1',
      children: [
        {
          id: '1.2',
          alias: 'chil11',
          label: 'Child Node 11',
          children: [
            {
              id: '1.3',
              alias: 'child3',
              label: 'Child Node 3',
              children: null
            },
            {
              id: '1.4',
              alias: 'child4',
              label: 'Child Node 4',
              children: null
            }
          ]
        }
      ]
    },
    {
      id: '1.2',
      alias: 'child2',
      label: 'Child Node 2',
      children: []
    }
  ]
}];

const mockProps: TreeSelectProps = {
  items: mockTree
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<React.StrictMode>
    <App items={mockProps.items}/>
</React.StrictMode>, document.getElementById('root'))
