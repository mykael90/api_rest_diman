const flatArrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.super_id === parent)
    .map((child) => ({
      ...child,
      sections: flatArrayToTree(arr, child.id),
    }));

export default flatArrayToTree;
