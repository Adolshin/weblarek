import { CardFullView, CardView, TCard } from "./abstractCardsViews.ts";
import { IProduct } from "../../../types/index.ts";
import { ensureElement } from "../../../utils/utils.ts";

interface ICardActions {
  onClick(): void;
}
type TCardPreview = Pick<IProduct, "description">;
type TCardBasket = Omit<TCard, "index">;

export class CardCatalogView extends CardFullView {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}

export class CardPreviewView extends CardFullView<TCardPreview> {
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

export class CardBasketView extends CardView<TCardBasket> {
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
