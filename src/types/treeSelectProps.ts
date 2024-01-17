export interface TreeSelectProps {
  tree: TreeSelectItems[] | [] // Array of items to display
  selectedIds?: string[] // Array of selected item ids
  onChange?: () => ({ selectedIds: string[], updatedTree: TreeSelectItems }) // Callback function to handle changes
  className?: string // Class name to be applied to the component
  targetId?: string // Id of the target element to be used for positioning portal
}

export interface Actions {
  EXPAND: 'EXPAND'
  SELECT: 'SELECT'
}

export type TreeSelectItems = {
  id: string
  alias: string
  label: string
  children: TreeSelectItems[] | null
  expanded?: boolean
  selected?: boolean
}

export type TreeItemKeys = keyof TreeSelectItems;
export type TreeItemValues = TreeSelectItems[TreeItemKeys];
