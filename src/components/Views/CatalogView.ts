import { Component } from "../base/Component.ts";

interface ICatalog {
  content: HTMLElement[];
}

export class CatalogView extends Component<ICatalog> {
  constructor(container: HTMLElement) {
    super(container);
  }
  protected set content(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
