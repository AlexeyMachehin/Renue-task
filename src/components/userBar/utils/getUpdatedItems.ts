export function getUpdatedItems<T extends { count: number; id: number }>(
  currentItems: T[],
  [...change]: T[],
): T[] {
  return currentItems.map(currentItem => {
    const itemOfChange = change.find(item => item.id == currentItem.id);
    if (itemOfChange) {
      currentItem.count -= itemOfChange.count;
    }
    return currentItem;
  });
}
