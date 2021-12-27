import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    activeCategory: state.catalog.params.categoryId
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
    filterByCategories: useMemo(() => ([
      {value:'all', title: 'Все'},
      ...select.categories
    ]), [select.activeCategory, select.categories]),
  }

  const callbacks = {
    onSort: useCallback(event => store.catalog.setParams({sort: event.target.value}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
    onFilter: useCallback(event => store.catalog.setParams({categoryId: event.target.value}), [store]),
  }

  return (
    <LayoutTools>
      <Select onChange={callbacks.onFilter} value={select.activeCategory} options={options.filterByCategories}/>
      <Input isThrottling={true} onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
