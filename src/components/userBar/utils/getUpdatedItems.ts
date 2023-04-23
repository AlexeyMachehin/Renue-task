export function getUpdatedItems<T extends { count: number; id: number }>(
  currentItems: T[],
  [...change]: T[],
): T[] {
  const updatedItems = currentItems.map(currentItem => {
    const itemOfChange = change.find(item => item.id == currentItem.id);

    if (itemOfChange) {
      return {
        ...currentItem,
        count: currentItem.count - itemOfChange.count,
      };
    }

    return currentItem;
  });

  return updatedItems;
}
