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
    this.container.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("modal__close") || target.classList.contains("modal")) {
        this.closeModal();
      }
    });
  }
  protected set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }
  closeModal() {
    this.container.classList.remove("modal_active");
    this.pageContainer.classList.remove("page_locked");
  }
  openModal() {
    this.container.classList.add("modal_active");
    this.pageContainer.classList.add("page_locked");
  }
}
