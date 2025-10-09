import { IEvents } from "../base/Events.ts";
import { IProduct } from "../../types/index.ts";
import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";

interface IBasket {
  content: HTMLElement[];
}

export class Basket extends Component<IBasket> {
  protected buttonElement: HTMLButtonElement;
  protected contentElement: HTMLElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.contentElement = ensureElement<HTMLElement>(".basket__list", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:registration");
    });
  }
   protected set content(items: HTMLElement[]) {
    this.contentElement.replaceChildren(...items);
  }
}
