import React, {useEffect} from "react";

/**
 * Хук для выборки данных из store
 * @param store {Store}
 * @return {unknown}
 */
export default function useStoreState(store){

  const [state, setState] = React.useState(store.getState());

  useEffect(() => {
    return store.subscribe(newState => {
      setState(newState)
    });
  }, []);

  return state;
}