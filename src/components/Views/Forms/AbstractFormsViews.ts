import { ensureElement, ensureAllElements } from "../../../utils/utils.ts";
import { Component } from "../../base/Component.ts";
import { IEvents } from "../../base/Events.ts";
import { IErrors } from "../../../types/index.ts";


export abstract class FormView extends Component<IErrors> {
  protected buttonElement: HTMLButtonElement;
  protected errorElement: HTMLElement;
  protected inputElements: HTMLInputElement[];
  constructor(protected events: IEvents, protected container: HTMLFormElement) {
    super(container);
    this.events = events;
    this.buttonElement = ensureElement<HTMLButtonElement>("[type=submit]", this.container);
    this.errorElement = ensureElement<HTMLButtonElement>(".form__errors", this.container);
    this.inputElements = ensureAllElements<HTMLInputElement>(".form__input", this.container);
    this.inputElements.forEach((input) => {
      input.addEventListener("input", (event) => {
        const input = event.target as HTMLInputElement;
        const inputName = input.getAttribute("name");
        events.emit("form:changed", { [inputName!]: input.value });
      });
    });
  }
  protected set errors(value: string) {
    this.errorElement.textContent = value;
  }
  
}
