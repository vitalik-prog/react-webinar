export const createItem = (state) => {
  const code = Math.max(0, ...state.items.map((item) => item.code)) + 1;
  return {
    ...state,
    items: state.items.concat({
      code,
      title: "Новая запись №" + code,
      clickCount: 0,
    }),
  };
};

export const deleteItem = (state, code) => {
  return { ...state, items: state.items.filter((item) => item.code !== code) };
};

export const selectItem = (state, code) => {
  return {
    ...state,
    items: state.items.map((item) => {
      if (item.code === code) {
        item.selected = !item.selected;
        if (item.selected) {
          item.clickCount++;
        }
      }
      return item;
    }),
  };
};
