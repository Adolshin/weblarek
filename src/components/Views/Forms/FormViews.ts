import { ensureElement } from "../../../utils/utils.ts";
import { FormView } from "./AbstractFormsViews.ts";
import { IEvents } from "../../base/Events.ts";

export class OrderFormView extends FormView {
  protected inputElement: HTMLInputElement;
  protected cardElement: HTMLButtonElement;
  protected cashElement: HTMLButtonElement;
  constructor(protected events: IEvents, protected container: HTMLFormElement) {
    super(events, container);
    this.inputElement = ensureElement<HTMLInputElement>("[name=address]", this.container);
    this.cardElement = ensureElement<HTMLButtonElement>("[name=card]", this.container);
    this.cashElement = ensureElement<HTMLButtonElement>("[name=cash]", this.container);
    this.buttonElement.addEventListener("click", (e)=> {
      e.preventDefault()
      events.emit("order:next")
    })
  }
}

export class ContactsFormView extends FormView {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor(protected events: IEvents, protected container: HTMLFormElement) {
    super(events, container);
    this.emailInputElement = ensureElement<HTMLInputElement>("[name=email]", this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>("[name=phone]", this.container);
    this.buttonElement.addEventListener("click", (e)=> {
      e.preventDefault()
      events.emit("order:post")
    })
  }
}
