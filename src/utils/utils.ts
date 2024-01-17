import type { TreeItemKeys, TreeItemValues, TreeSelectItems } from '../types/treeSelectProps.ts';

export const editTreeItems = (data: TreeSelectItems[], targetId: string, key: TreeItemKeys, value: TreeItemValues) => {
  return data.map((item) => {
    if (item.id === targetId) {
      return { ...item, [key]: value }
    }

    if (item?.children?.length) {
      item.children = [...editTreeItems(item.children, targetId, key, value)];
    }

    return item;
  });
};

export const prepareTree = (data: TreeSelectItems[], selectedIds?: string[]) => {
  const newArray = [...data];

  newArray.map((node) => {
    node.expanded = node?.expanded ?? false;
    node.selected = node?.selected ?? false;
    if (selectedIds && selectedIds.includes(node.id)) {
      node.selected = true;
    }

    if (node?.children?.length) {
      node.children = [...prepareTree(node.children, selectedIds)];
    }

    return node;
  });
  return newArray;
}
