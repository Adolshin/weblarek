import { Component } from "../base/Component.ts";


interface IGallery {
  content: HTMLElement[];
}

export class GalleryView extends Component<IGallery> {
  protected contentElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.contentElement = this.container;
  }
  protected set content(items: HTMLElement[]) {
    this.contentElement.replaceChildren(...items);
  }
}
