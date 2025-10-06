import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

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
    if (this.catalogElement) {
      this.catalogElement.replaceChildren(...items);
    }
  }
}
