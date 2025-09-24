import { IProduct } from "../../types/index.ts";

export class Catalog {
  protected productList: IProduct[] = [];
  protected product?: IProduct;
  constructor() {}

  setProductList(data: IProduct[]): void {
    this.productList = data;
    console.log("Массив товаров записан в хранилище"); //для проверки
  }

  getProductList(): IProduct[] {
    return this.productList;
  }
  getProductById(id: string): IProduct | undefined {
    const item = this.productList.find((product) => product.id === id);
    if (item) {
      return item;
    } else {
      console.log("Товара с таким id не сущестует"); //для проверки
    }
  }

  setProduct(id: string): void {
    const product = this.getProductById(id);
    this.product = product;
    console.log("Товар выбран"); //для проверки
  }
  getProduct(): IProduct | undefined {
    return this.product;
  }
}
