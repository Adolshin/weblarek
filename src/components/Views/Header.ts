import { Component } from "../base/Component.ts";

interface IHeaderData {
  counter: number;
  // logo:number;
}

export class Header extends Component<IHeaderData> {
  basketButton: HTMLButtonElement | null = null;
  counterElement: HTMLElement | null = null;
  logoElement: HTMLElement | null = null;
  // counter:number = 0
  // logo:number = 0
  constructor() {
    const header: HTMLElement | null = document.querySelector(".header");
    if (header) {
      super(header);
    }
  }
  set counter(value: number) {
    this.counterElement = this.container.querySelector(".header__basket-counter");
    if (this.counterElement) {
      this.counterElement.textContent = `${value}`;
    }
  }
  // renderHeader(data:Partial<IHeaderData>) {
  //   super.render(data)
  //   this.counterElement = this.container.querySelector(".header__basket-counter");
  //   this.logoElement = this.container.querySelector(".header__logo");
  //   if (this.counterElement) {
  //     this.counterElement.textContent = `${this.counter}`;
  //   }
  //   if (this.logoElement) {
  //     this.logoElement.textContent = `${this.logo}`;
  //   }
  // }
}
