import { Component } from "../base/Component.ts";


interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.catalogElement = this.container;
  }
  protected set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}
