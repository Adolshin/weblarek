import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Cart {
  protected productList: IProduct[] = [];
  constructor(protected events: IEvents) {
    this.events = events;
  }
  getProductList(): IProduct[] {
    return this.productList;
  }

  addProduct(product: IProduct | undefined): void {
    if (product && !this.checkProduct(product.id)) {
      this.productList.push(product);
      this.events.emit("basket:changed");
    }
  }

  deleteProduct(id: string): void {
    const updatedProductList = this.productList.filter((product) => product.id !== id);
    this.productList = updatedProductList;
  }

  clearCart(): void {
    this.productList = [];
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

  checkProduct(id: string): boolean {
    return this.productList.some((product) => product.id === id);
  }
}
