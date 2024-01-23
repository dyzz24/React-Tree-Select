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

export const searchTreeItem = (tree: TreeSelectItems[], searchStr: string) => {
  return tree.map(item => {
    const deepLevel = checkFilteredDeeps(item?.children ?? [], searchStr, false);

    if (deepLevel) {
      item.expanded = true
    } else item.expanded = false

    if (item.label.toLowerCase().includes(searchStr.toLowerCase())) {
      item.filtered = true
    } else {
      item.filtered = false
    }

    if (item?.children?.length) {
      item.children = [...searchTreeItem(item.children, searchStr)];
    }

    return item;
  })
}

export const checkFilteredDeeps = (tree: TreeSelectItems[], searchStr: string, target: boolean): boolean => {
  let hasDeepTarget = target;

  for (let i = 0; i < tree.length; i++) {
    const isMatch = tree[i].label.toLowerCase().includes(searchStr.toLowerCase());
    if (isMatch) {
      hasDeepTarget = true;
      break
    }
    if (!isMatch && tree[i]?.children?.length) {
      hasDeepTarget = checkFilteredDeeps(tree[i]?.children!, searchStr, hasDeepTarget);
    }
  }

  return hasDeepTarget;
};
