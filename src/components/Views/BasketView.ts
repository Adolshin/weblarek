import { IEvents } from "../base/Events.ts";
import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";

interface IBasket {
  content: HTMLElement[];
  price: number;
}

export class BasketView extends Component<IBasket> {
  protected buttonElement: HTMLButtonElement;
  protected contentElement: HTMLElement;
  protected priceElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.contentElement = ensureElement<HTMLElement>(".basket__list", this.container);
    this.priceElement = ensureElement<HTMLElement>(".basket__price", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:registration");
    });
  }
  protected set content(items: HTMLElement[]) {
    this.contentElement.replaceChildren(...items);
  }
  protected set price(value:number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}
