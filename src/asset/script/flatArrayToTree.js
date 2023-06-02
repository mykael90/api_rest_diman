const flatArrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.superId === parent)
    .map((child) => ({
      ...child,
      sections: flatArrayToTree(arr, child.id),
    }));

export default flatArrayToTree;
