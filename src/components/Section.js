export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderer = () => {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
