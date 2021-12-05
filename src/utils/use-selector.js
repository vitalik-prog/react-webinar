import React, {useEffect} from "react";
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store
 * @param store {Store}
 * @param selector {Function}
 * @return {unknown}
 */
export default function useSelector(store, selector){

  const [state, setState] = React.useState(selector(store.getState()));

  useEffect(() => {
    return store.subscribe(newState => {
      const result = selector(newState);
      if (!shallowequal(state, result)) {
        setState(result);
      }
    });
  }, []);

  return state;
}