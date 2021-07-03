/**
 * Приложение
 * @param store {Store} Состояние с действиями
 * @return {HTMLElement} DOM всей страницы.
 */
function App({store}) {
  return (
    createElement('div', {className: 'App'},
      createElement('div', {className: 'App__head'},
        createElement('h1', {textContent: 'Приложение на чистом JS'}),
      ),
      createElement('div', {className: 'Controls'},
        createElement('button', {
          textContent: 'Добавить',
          onclick: () => store.createItem()
        }),
      ),
      createElement('div', {className: 'App__center'},
        createElement('div', {className: 'List'}, () => store.getState().items.map(item =>
            createElement('div', {
                className: 'List__item' + (item.selected ? ' List__item_selected' : '')
              },
              createElement('div', {
                  className: 'Item',
                  onclick: () => store.selectItem(item.code)
                },
                createElement('div', {className: 'Item__number', textContent: item.code}),
                createElement('div', {className: 'Item__title', textContent: item.title}),
                createElement('div', {className: 'Item__actions'},
                  createElement('button', {
                    textContent: 'Удалить',
                    onclick: () => store.deleteItem(item.code)
                  }),
                )
              )
            )
          )
        )
      ),
    )
  );
}