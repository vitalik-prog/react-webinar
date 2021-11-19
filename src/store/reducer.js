import { actionType } from "./actionTypes";
import { createItem, selectItem, deleteItem } from "./reducerHelpers";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CREATE_ITEM: {
      return (state = createItem(state));
    }

    case actionType.DELETE_ITEM: {
      return (state = deleteItem(state, action.payload));
    }

    case actionType.SELECT_ITEM: {
      return (state = selectItem(state, action.payload));
    }

    default:
      return state;
  }
};
