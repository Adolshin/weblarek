import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents, EventType } from "../base/Events.ts";

interface ISuccess {
  content: HTMLElement;
  price: number;
}

export class SuccessView extends Component<ISuccess> {
  protected buttonElement: HTMLButtonElement;
  protected priceElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.container);
    this.priceElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.buttonElement.addEventListener("click", () => {
      events.emit(EventType.orderComplete);
    });
  }
  set price(value: number) {
    this.priceElement.textContent = `Списано ${value} синапсов`;
  }
}
