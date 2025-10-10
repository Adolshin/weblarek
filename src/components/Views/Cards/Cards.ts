import { IEvents } from "../../base/Events.ts";
import { CardFull, Card, TCard } from "./abstractCards.ts";
import { IProduct } from "../../../types/index.ts";
import { ensureElement } from "../../../utils/utils.ts";

interface ICardActions {
  onClick(): void;
}
type TCardPreview = Pick<IProduct, "description">;
type TCardBasket = Omit<TCard, "index">;

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
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.descriptionElement = ensureElement<HTMLImageElement>(".card__text", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }
  protected set description(value: string) {
    this.descriptionElement.textContent = value;
  }
  renderButton(inBasket: boolean, hasPrice: boolean = true) {
    if (!hasPrice) {
      this.buttonElement.setAttribute("disabled", "");
      this.buttonElement.textContent = "Недоступно";
    } else if (hasPrice && !inBasket) {
      this.buttonElement.removeAttribute("disabled");
      this.buttonElement.textContent = "Купить";
    } else if (hasPrice && inBasket) {
      this.buttonElement.textContent = "Удалить из корзины";
      this.buttonElement.removeAttribute("disabled");
    }
  }
}

export class CardBasket extends Card<TCardBasket> {
  protected indexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.indexElement = ensureElement<HTMLButtonElement>(".basket__item-index", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }
  protected set index(value: number) {
    this.indexElement.textContent = value.toString();
  }
}
