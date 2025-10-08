import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { IProduct } from "../../types/index.ts";
import { categoryMap } from "../../utils/constants.ts";

interface ICardActions {
  onClick(): IEvents;
}
type CategoryKey = keyof typeof categoryMap;
export type TCardPreview = Pick<IProduct, "description">;
export type TCard = Pick<IProduct, "title" | "price">;
export type TCardFull = Pick<IProduct, "image" | "category">;

abstract class Card<T> extends Component<TCard & T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
  }
  protected set title(value: string) {
    this.titleElement.textContent = `${value}`;
  }

  protected set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}

export class CardFull<T = {}> extends Card<TCardFull&T> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  constructor(container: HTMLElement) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
  }
  protected set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }
  protected set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}

export class CardCatalog extends CardFull {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);   
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}

export class CardPreview extends CardFull<TCardPreview> { 
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);   
    this.descriptionElement = ensureElement<HTMLImageElement>(".card__text", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:add");
    });
  }
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}
