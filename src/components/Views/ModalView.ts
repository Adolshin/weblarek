import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";

interface IModal {
  content: HTMLElement;
}

export class ModalView extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(container: HTMLElement, protected pageContainer: HTMLElement) {
    super(container);
    this.contentElement = ensureElement<HTMLElement>(".modal__content", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".modal__close", this.container);
  }
  protected set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }
  protected handleClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains("modal__close") || target.classList.contains("modal")) {
      this.closeModal();
    }
  };
  protected handleEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };
  closeModal() {
    this.container.classList.remove("modal_active");
    this.pageContainer.classList.remove("page__wrapper_locked");
    this.container.removeEventListener("click", this.handleClick);
    document.removeEventListener("keydown", this.handleEscape);
  }
  openModal() {
    this.container.classList.add("modal_active");
    this.pageContainer.classList.add("page__wrapper_locked");
    this.container.addEventListener("click", this.handleClick);
    document.addEventListener("keydown", this.handleEscape);
  }
}
