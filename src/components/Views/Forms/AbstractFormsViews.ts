import { ensureElement, ensureAllElements } from "../../../utils/utils.ts";
import { Component } from "../../base/Component.ts";
import { IEvents } from "../../base/Events.ts";
import { IErrors } from "../../../types/index.ts";

interface IFormErrors extends IErrors {  
  valid: boolean;
  errors: string;
}

export abstract class FormView extends Component<IFormErrors> {
  protected buttonElement: HTMLButtonElement;
  protected errorElement: HTMLElement;
  protected inputElements: HTMLInputElement[];
  constructor(protected events: IEvents, protected container: HTMLFormElement) {
    super(container);
    this.events = events;
    this.buttonElement = ensureElement<HTMLButtonElement>("[type=submit]", this.container);
    this.errorElement = ensureElement<HTMLButtonElement>(".form__errors", this.container);
    this.inputElements = ensureAllElements<HTMLInputElement>(".form__input", this.container);
    this.container.addEventListener("input", (event) => {
      const inputElement = event.target as HTMLInputElement;
      const inputName = inputElement.getAttribute("name");
      this.eventEmit(inputName!, inputElement.value);
    });
  }
  protected set errors(value: string) {
    this.errorElement.textContent = value;
  }

  protected set valid(value: boolean) {
    if (value) {
      this.buttonElement.removeAttribute("disabled");
    } else {
      this.buttonElement.setAttribute("disabled", "");
    }
  }
  protected inputHandler(inputlist: HTMLInputElement[], name: string, value: string) {
    inputlist.forEach((input) => {
      const inputName = input.getAttribute("name");
      if (inputName === `${name}`) {
        input.value = value;
      }
    });
  }
  protected eventEmit(field: string, value: string) {
    this.events.emit("form:changed", { [field]: value });
  }
}
