import { ensureAllElements } from "../../../utils/utils.ts";
import { FormView } from "./AbstractFormViews.ts";
import { IEvents } from "../../base/Events.ts";

export class OrderFormView extends FormView {
  protected switchElement: HTMLButtonElement[];
  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);
    this.switchElement = ensureAllElements<HTMLButtonElement>(".button_alt", this.container);
    this.switchElement.forEach((item) => {
      item.addEventListener("click", (event) => {
        const button = event.target as HTMLButtonElement;
        const buttonName = button.getAttribute("name");
        this.eventEmit("payment", buttonName!);
      });
    });
    this.buttonElement.addEventListener("click", (event) => {
      event.preventDefault();
      this.events.emit("order:next");
    });
  }
  protected set address(value: string) {
    this.inputHandler(this.inputElements, "address", value);
  }
  protected set payment(value: string) {
    if (!value) {
      this.switchElement.forEach((item) => {
        item.classList.remove("button_alt-active");
      });
    } else {
      this.switchElement.forEach((item) => {
        item.classList.remove("button_alt-active");
        const buttonName = item.getAttribute("name");
        if (buttonName === value) {
          item.classList.add("button_alt-active");
        }
      });
    }
  }
}

export class ContactsFormView extends FormView {
  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);
    this.buttonElement.addEventListener("click", (event) => {
      event.preventDefault();
      events.emit("order:post");
    });
  }

  protected set email(value: string) {
    this.inputHandler(this.inputElements, "email", value);
  }
  protected set phone(value: string) {
    this.inputHandler(this.inputElements, "phone", value);
  }
}
