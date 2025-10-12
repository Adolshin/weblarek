import { ensureElement, ensureAllElements } from "../../../utils/utils.ts";
import { FormView } from "./AbstractFormsViews.ts";
import { IEvents } from "../../base/Events.ts";

export class OrderFormView extends FormView {
  protected switchElement: HTMLButtonElement[];
  protected addressInputElement: HTMLInputElement;
  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);
    this.switchElement = ensureAllElements<HTMLButtonElement>(".button_alt", this.container);
    this.addressInputElement = ensureElement<HTMLInputElement>("[name=address]", this.container);
    this.switchElement.forEach((item) => {
      item.addEventListener("click", (event) => {
        this.switchElement.forEach((item) => {
          item.classList.remove("button_alt-active");
        });
        const button = event.target as HTMLButtonElement;
        const buttonName = button.getAttribute("name");
        button.classList.add("button_alt-active");
        events.emit("form:changed", { payment: buttonName });
      });
    });
    this.buttonElement.addEventListener("click", (e) => {
      e.preventDefault();
      events.emit("order:next");
    });
  }
  protected set valid(value: boolean) {
    if (value) {
      this.buttonElement.removeAttribute("disabled");
    } else {
      this.buttonElement.setAttribute("disabled", "");
    }
  }
  protected set address(value: string) {
    this.addressInputElement.value = value;
  }
  protected set payment(value: string) {
    if (!value) {
      this.switchElement.forEach((item) => {
        item.classList.remove("button_alt-active");
      });
    }
  }
}

export class ContactsFormView extends FormView {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;
  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);
    this.emailInputElement = ensureElement<HTMLInputElement>("[name=email]", this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>("[name=phone]", this.container);
    this.buttonElement.addEventListener("click", (e) => {
      e.preventDefault();
      events.emit("order:post");
    });
  }
  protected set valid(value: boolean) {
    if (value) {
      this.buttonElement.removeAttribute("disabled");
    } else {
      this.buttonElement.setAttribute("disabled", "");
    }
  }
  protected set email(value: string) {
    this.emailInputElement.value = value;
  }
  protected set phone(value: string) {
    this.phoneInputElement.value = value;
  }
}
