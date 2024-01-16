export interface TreeSelectProps {
  items: TreeSelectItems[] | [] // Array of items to display
  selectedIds?: string[] // Array of selected item ids
  onChange?: () => ({ selectedIds: string[], updatedTree: TreeSelectItems }) // Callback function to handle changes
  className?: string // Class name to be applied to the component
}

export interface Actions {
  COLLAPSE: 'COLLAPSE'
  EXPAND: 'EXPAND'
  SELECT: 'SELECT'
}

export interface TreeSelectItems {
  id: string
  alias: string
  label: string
  children: TreeSelectItems[] | [] | null
  expanded?: boolean
  selected?: boolean
}
