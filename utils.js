/**
 * Создание элемента с аттрибутами и вложенными элементами
 * @param name {String} Название тега
 * @param attr {Object} Атрибуты тегу
 * @param children {...Node|Function|Array} Вложенные элементы
 * @return {HTMLElement}
 */
function createElement(name, attr = {}, ...children) {
  const element = document.createElement(name);
  // Атрибуты, классы, id
  for (const name of Object.keys(attr)) {
    switch (name) {
      // Свойства
      case 'id':
      case 'className':
      case 'textContent':
      case 'onclick':
        element[name] = attr[name];
        break;
      // Всё остальное атрибуты
      default:
        element.setAttribute(name, attr[name]);
    }
  }
  // Подчиненные узлы
  for (let child of children) {
    if (typeof child === 'function') child = child();
    if (Array.isArray(child)) {
      child.forEach(item => element.append(item));
    } else {
      element.append(child);
    }
  }
  return element;
}


/**
 * Рендер приложения в узел DOM
 * @param root {HTMLElement} Узел DOM куда вставить app
 * @param app {HTMLElement} DOM приложения
 */
function render(root, app){
  // Удаляем содержимое root
  while (root.lastElementChild) {
    root.removeChild(root.lastElementChild);
  }
  // Рендерим приложение
  root.append(app);
}