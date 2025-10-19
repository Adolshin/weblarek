import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { EventType } from "../../utils/constants.ts";

interface IModal {
  content: HTMLElement;
  open: boolean;
}

export class ModalView extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement, protected pageContainer: HTMLElement) {
    super(container);
    this.contentElement = ensureElement<HTMLElement>(".modal__content", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.container.addEventListener("click", this.handleClick);
    document.addEventListener("keydown", this.handleEscape);
  }
  protected set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }
  protected handleClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains("modal__close") || target.classList.contains("modal")) {
      this.events.emit(EventType.modalClose);
    }
  };

  protected handleEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      this.events.emit(EventType.modalClose);
    }
  };

  set open(value: boolean) {
    if (value) {
      this.container.classList.add("modal_active");
      this.pageContainer.classList.add("page_locked");
    } else {
      this.container.classList.remove("modal_active");
      this.pageContainer.classList.remove("page_locked");
    }
  }
}
