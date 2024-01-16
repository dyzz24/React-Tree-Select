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

  newArray.map((item) => {
    item.expanded = item?.expanded ?? false;
    item.selected = item?.selected ?? false;
    if (selectedIds && selectedIds.includes(item.id)) {
      item.selected = true;
    }

    if (item?.children?.length) {
      item.children = [...prepareTree(item.children, selectedIds)];
    }

    return item;
  });
  return newArray;
}
