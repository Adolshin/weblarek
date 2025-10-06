import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);
  }
  protected set counter(value: number) {
    if (this.counterElement) {
      this.counterElement.textContent = `${value}`;
    }
  }
}
