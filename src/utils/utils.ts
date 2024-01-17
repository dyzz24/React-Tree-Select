import type { TreeItemKeys, TreeItemValues, TreeSelectItems } from '../types/treeSelectProps.ts';

export const editTreeItems = (data: TreeSelectItems[], targetId: string, key: TreeItemKeys, value: TreeItemValues) => {
  const newArray = [...data];
  newArray.map((item) => {
    if (item.id === targetId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      item[key] = value;
      return item;
    }

    if (item?.children?.length) {
      item.children = [...editTreeItems(item.children, targetId, key, value)];
    }

    return item;
  });
  return newArray;
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
