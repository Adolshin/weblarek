import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Catalog {
  protected productList: IProduct[] = [];
  protected product?: IProduct;
  events: IEvents;
  constructor(events: IEvents) {
    this.events = events
  }

  setProductList(data: IProduct[]): void {
    this.productList = data;
    this.events.emit("catalog:changed");
  }

  getProductList(): IProduct[] {
    return this.productList;
  }
  getProductById(id: string): IProduct | undefined {
    const item = this.productList.find((product) => product.id === id);
    if (item) {
      return item;
    }
  }

  setProduct(id: string): void {
    const product = this.getProductById(id);
    this.product = product;
    this.events.emit("selectedCard:changed");
  }
  getProduct(): IProduct | undefined {
    return this.product;
  }
}
