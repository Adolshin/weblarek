import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected buttonElement: HTMLButtonElement;
  protected counterElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".header__basket", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }
  protected set counter(value: number) {
    this.counterElement.textContent = `${value}`;
  }
}
