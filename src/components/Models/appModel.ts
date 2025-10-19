import { IEvents } from "../base/Events.ts";
import { EventType } from "../../utils/constants.ts";

export class AppModel {
  protected modalIsOpen: boolean = false;
  constructor(protected events: IEvents) {}
  toggleModalState(): void {
    this.modalIsOpen = this.modalIsOpen ? !this.modalIsOpen : true;
    this.events.emit(EventType.modalStateChanged);
  }
  getModalState(): boolean {
    return this.modalIsOpen;
  }
  // openModal(): void {
  //   this.modalIsOpen = true;
  //   this.events.emit(EventType.modalStateChanged);
  // }
  // closeModal(): void {
  //   this.modalIsOpen = false;
  //   this.events.emit(EventType.modalStateChanged);
  // }
}
