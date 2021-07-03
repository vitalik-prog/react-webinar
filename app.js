/**
 * Приложение
 * @param store {Store} Состояние с действиями
 * @return {ReactElement}
 */
function App({store}) {
  return (
    React.createElement('div', {className: 'App'},
      React.createElement('div', {className: 'App__head'},
        React.createElement('h1', {}, 'Приложение на чистом JS'),
      ),
      React.createElement('div', {className: 'Controls'},
        React.createElement('button', {onClick: () => store.createItem()}, 'Добавить'),
      ),
      React.createElement('div', {className: 'App__center'},
        React.createElement('div', {className: 'List'}, store.getState().items.map(item =>
            React.createElement('div', {
                key: item.code,
                className: 'List__item' + (item.selected ? ' List__item_selected' : '')
              },
              React.createElement('div', {
                  className: 'Item',
                  onClick: () => store.selectItem(item.code)
                },
                React.createElement('div', {className: 'Item__number'}, item.code),
                React.createElement('div', {className: 'Item__title'}, item.title),
                React.createElement('div', {className: 'Item__actions'},
                  React.createElement('button', {onClick: () => store.deleteItem(item.code)},
                    'Удалить'
                  ),
                )
              )
            )
          )
        )
      ),
    )
  );
}