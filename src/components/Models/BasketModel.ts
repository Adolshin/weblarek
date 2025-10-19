import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { EventType } from "../../utils/constants.ts";

export class BasketModel {
  protected productList: IProduct[] = [];
  constructor(protected events: IEvents) {}
  getProductList(): IProduct[] {
    return this.productList;
  }

  addProduct(product: IProduct | undefined): void {
    if (product && !this.checkProduct(product.id)) {
      this.productList.push(product);
      this.events.emit(EventType.basketChanged);
    }
  }

  deleteProduct(id: string): void {
    const updatedProductList = this.productList.filter((product) => product.id !== id);
    this.productList = updatedProductList;
    this.events.emit(EventType.basketChanged);
  }

  clearBasket(): void {
    this.productList = [];
    this.events.emit(EventType.basketChanged);
  }

  getTotalPrice(): number {
    let total: number = 0;
    this.productList.forEach((product) => {
      total += Number(product.price);
    });
    return total;
  }

  getProductQuantity(): number {
    return this.productList.length;
  }

  checkProduct(id: string | undefined): boolean {
    return this.productList.some((product) => product.id === id);
  }
}
