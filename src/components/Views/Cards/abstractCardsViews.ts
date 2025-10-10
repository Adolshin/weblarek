import { ensureElement } from "../../../utils/utils.ts";
import { Component } from "../../base/Component.ts";
import { IProduct } from "../../../types/index.ts";
import { categoryMap } from "../../../utils/constants.ts";

type CategoryKey = keyof typeof categoryMap;
export type TCard = Pick<IProduct, "title" | "price">;
type TCardFull = Pick<IProduct, "image" | "category">;

export abstract class CardView<T> extends Component<TCard & T> {
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
    if (value) {
      this.priceElement.textContent = `${value} синапсов`;
    } else {
      this.priceElement.textContent = "Бесценно"
    }
  }
}

export abstract class CardFullView<T = {}> extends CardView<TCardFull & T> {
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
