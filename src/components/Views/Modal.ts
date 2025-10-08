import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(container: HTMLElement) {
    super(container);
    this.contentElement = ensureElement<HTMLElement>(".modal__content", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.buttonElement.addEventListener("click", () => {
      this.closeModal();
    });
  }
  protected set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }
  closeModal() {
    this.container.classList.remove("modal_active");
  }
  openModal() {
    this.container.classList.add("modal_active");
  }
}
