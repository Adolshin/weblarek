import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { EventType } from "../../utils/constants.ts";

export class CatalogModel {
  protected productList: IProduct[] = [];
  protected product?: IProduct;
  constructor(protected events: IEvents) {}

  setProductList(data: IProduct[]): void {
    this.productList = data;
    this.events.emit(EventType.catalogChanged);
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
    this.events.emit(EventType.selectedCardChanged);
  }
  getProduct(): IProduct | undefined {
    return this.product;
  }
}
