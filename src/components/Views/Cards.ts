import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { IProduct } from "../../types/index.ts";
import { categoryMap } from "../../utils/constants.ts";

interface ICardActions {
  onClick(): IEvents;
}
type CategoryKey = keyof typeof categoryMap;
// export type TCardCatalog = Pick<IProduct, "image" | "category">;
// export type TCardPreview = Pick<IProduct, "image" | "category" | "description">;
// export type TCard = Pick<IProduct, "title" | "category">;

abstract class Card extends Component<IProduct> {
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
    this.priceElement.textContent = `${value}`;
  }
}

export class CardCatalog extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }
  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}

export class CardPreview extends Card {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.descriptionElement = ensureElement<HTMLImageElement>(".card__text", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("basket:add");
    });
  }
  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }
  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}
