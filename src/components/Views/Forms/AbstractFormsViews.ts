import { ensureElement } from "../../../utils/utils.ts";
import { Component } from "../../base/Component.ts";
import { IEvents } from "../../base/Events.ts";

interface IForm {
  error: string;
}

export abstract class FormView extends Component<IForm> {
  protected buttonElement: HTMLButtonElement;
  protected errorElement: HTMLElement;
  constructor(protected events: IEvents, protected container: HTMLFormElement) {
    super(container);
    this.buttonElement = ensureElement<HTMLButtonElement>("[type=submit]", this.container);
    this.errorElement = ensureElement<HTMLButtonElement>(".form__errors", this.container);
    this.buttonElement.removeAttribute("disabled")
    
  }
  protected set error(value:string) {
    this.errorElement.textContent = value;
  }
}
