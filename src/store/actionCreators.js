import { actionType } from "./actionTypes";

export const createItemActionCreator = () => ({ type: actionType.CREATE_ITEM });

export const deleteItemActionCreator = (code) => ({
  type: actionType.DELETE_ITEM,
  payload: code,
});

export const selectItemActionCreator = (code) => ({
  type: actionType.SELECT_ITEM,
  payload: code,
});
