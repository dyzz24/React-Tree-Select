import React from 'react'
import ReactDOM from 'react-dom'
import { TreeSelectItems, TreeSelectProps } from './types';

import { ReactTreeSelect } from './react-tree-select.tsx';

const mockTree: TreeSelectItems[] = [{
  id: 'world',
  label: 'World',
  children: [
    {
      id: 'continent-1',
      label: 'Continent: Asia',
      expanded: true,
      children: [
        {
          id: 'country-1-1',
          label: 'Country: China',
          children: [
            {
              id: 'city-1-1-1',
              label: 'City: Beijing',
              children: null
            },
            {
              id: 'city-1-1-2',
              label: 'City: Shanghai',
              children: [
                {
                  id: 'district-1-1-2-1',
                  label: 'District: Pudong',
                  children: null
                },
                {
                  id: 'district-1-1-2-2',
                  label: 'District: Huangpu',
                  children: null
                }
              ]
            }
          ]
        },
        {
          id: 'country-1-2',
          label: 'Country: Japan',
          children: [
            {
              id: 'city-1-2-1',
              label: 'City: Tokyo',
              children: null
            },
            {
              id: 'city-1-2-2',
              label: 'City: Kyoto',
              children: null
            }
          ]
        }
      ]
    },
    {
      id: 'continent-2',
      label: 'Continent: Europe',
      expanded: true,
      children: [
        {
          id: 'country-2-1',
          label: 'Country: France',
          children: [
            {
              id: 'city-2-1-1',
              label: 'City: Paris',
              children: null
            }
          ]
        },
        {
          id: 'country-2-2',
          label: 'Country: Germany',
          children: [
            {
              id: 'city-2-2-1',
              label: 'City: Berlin',
              children: null
            },
            {
              id: 'city-2-2-2',
              label: 'City: Munich',
              children: null
            }
          ]
        }
      ]
    },
    {
      id: 'continent-3',
      label: 'Continent: North America',
      children: [
        {
          id: 'country-3-1',
          label: 'Country: United States',
          children: [
            {
              id: 'state-3-1-1',
              label: 'State: California',
              expanded: false,
              children: [
                {
                  id: 'city-3-1-1-1',
                  label: 'City: Los Angeles',
                  children: null
                },
                {
                  id: 'city-3-1-1-2',
                  label: 'City: San Francisco',
                  children: null
                }
              ]
            },
            {
              id: 'state-3-1-2',
              label: 'State: New York',
              children: [
                {
                  id: 'city-3-1-2-1',
                  label: 'City: New York City',
                  children: null
                },
                {
                  id: 'city-3-1-2-2',
                  label: 'City: Buffalo',
                  children: null
                }
              ]
            }
          ]
        },
        {
          id: 'country-3-2',
          label: 'Country: Canada',
          children: [
            {
              id: 'province-3-2-1',
              label: 'Province: Ontario',
              children: null
            },
            {
              id: 'province-3-2-2',
              label: 'Province: Quebec',
              children: null
            }
          ]
        }
      ]
    }
  ],
  expanded: true
}];

const mockProps: TreeSelectProps = {
  tree: mockTree,
  onChange: (el) => {
    console.log(el);
  },
  selectedIds: [],
  targetNodeId: 'test'
}
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<React.StrictMode>
    <>
        <div id="test"></div>
        <ReactTreeSelect {...mockProps} targetNodeId={'test'} selectedIds={['city-2-1-1']}/>
        <ReactTreeSelect {...mockProps} hideCheckbox
                         renderIconBefore={undefined}
                         selectedIds={['city-2-1-1']}
                         hideSelectedChildCount
        />
    </>
</React.StrictMode>, document.getElementById('root'))
