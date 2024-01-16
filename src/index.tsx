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
      alias: 'child11',
      label: 'Child Node 11',
      children: [
        {
          id: '1.1.1',
          alias: 'chil11',
          label: 'Child Node 11',
          children: [
            {
              id: '1.1.2',
              alias: 'child12',
              label: 'Child Node 122',
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
    <>
        <div id="test"></div>
        <App items={mockProps.items} targetId={'test'} selectedIds={['1.2']}/>

    </>
</React.StrictMode>, document.getElementById('root'))
