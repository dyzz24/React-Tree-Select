import { TreeItemKeys, TreeItemValues, TreeSelectItems } from '../types';

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
    item.expanded = checkFilteredDeeps(item?.children ?? [], searchStr, false);
    item.filtered = item.label.toLowerCase().includes(searchStr.toLowerCase());

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

const checkSelectedDeeps = (tree: TreeSelectItems[], target: number): number => {
  let hasDeepTarget = target;

  for (let i = 0; i < tree.length; i++) {
    const isMatch = tree[i].selected;
    if (isMatch) {
      hasDeepTarget += 1;
    }
    if (tree[i]?.children?.length) {
      hasDeepTarget = checkSelectedDeeps(tree[i]?.children!, hasDeepTarget);
    }
  }

  return hasDeepTarget;
};

export const setHasSelectedChild = (tree: TreeSelectItems[], hideSelectedChildCount: boolean) => {
  if (hideSelectedChildCount) return tree;
  return tree.map(item => {
    item.hasSelectedChild = checkSelectedDeeps(item?.children ?? [], 0);

    if (item?.children?.length) {
      item.children = [...setHasSelectedChild(item.children, hideSelectedChildCount)];
    }

    return item;
  })
}
