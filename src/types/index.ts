import type React from 'react';

export type TreeSelectProps = BaseComponentProps & {
  tree: TreeSelectItems[] | [] // Array of items to display
  selectedIds?: string[] // Array of selected item ids
  onChange: onChangeCallback // Callback function to handle changes
  className?: string // Class name to be applied to the component
  targetNodeId?: string // id of the target element to be used for positioning portal with TreeSelect content
  loading?: boolean // loading tree state
}

export type BaseComponentProps = {
  renderIconBefore?: RenderIconType // render icon before the label
  renderIconAfter?: RenderIconType // render icon after the label
  hideCheckbox?: boolean // hide checkbox
  hideSelectedChildCount?: boolean // hide selected child count
  hideSearchInput?: boolean // hide search input
}

export type RenderIconType = React.ReactNode | Element | JSX.Element | React.ReactElement;

export type onChangeCallback = (args: { selectedIds: string[], updatedTree: TreeSelectItems[] }) => void

export type TreeSelectItems = {
  id: string
  label: string
  children: TreeSelectItems[] | null
  expanded?: boolean
  selected?: boolean
  filtered?: boolean
  hasSelectedChild?: number
}

export type TreeItemKeys = keyof TreeSelectItems;
export type TreeItemValues = TreeSelectItems[TreeItemKeys];
