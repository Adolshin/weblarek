import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

interface ISuccess {
  content: HTMLElement;
}

export class SuccessView extends Component<ISuccess> {
  protected buttonElement: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".button", this.container);
    this.buttonElement.addEventListener("click", () => {
      events.emit("order:complete");
    });
  }
}
