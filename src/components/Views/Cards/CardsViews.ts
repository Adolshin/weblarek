import { CardFullView, CardView, TCard } from "./AbstractCardsViews.ts";
import { IProduct } from "../../../types/index.ts";
import { ensureElement } from "../../../utils/utils.ts";

interface ICardActions {
  onClick(): void;
}
type TCardBasket = TCard & {
  index: number;
};
type TCardPreview = Pick<IProduct, "description">;
type TButtonState = {
  inBasket: boolean;
  hasPrice: boolean;
};

export class CardCatalogView extends CardFullView {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}

export class CardPreviewView extends CardFullView<TCardPreview & TButtonState> {
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

  set inBasket(value: boolean) {
    if (value) {
      this.buttonElement.textContent = "Удалить из корзины";
    } else {
      this.buttonElement.textContent = "Купить";
    }
  }
  set hasPrice(value: boolean) {
    if (!value) {
      this.buttonElement.setAttribute("disabled", "");
      this.buttonElement.textContent = "Недоступно";
    } else {
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
