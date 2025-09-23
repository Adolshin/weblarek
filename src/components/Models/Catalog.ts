import { IProduct } from "../../types/index.ts";

export class Catalog {
  protected products: IProduct[] = [];
  protected product?: IProduct;
  constructor() {}

  setProducts(data: IProduct[]): void {
    this.products = data;
    console.log("Список товаров получен"); //для проверки
  }

  getProducts(): IProduct[] {
    return this.products;
  }
  getProductById(id: string): IProduct | undefined {
    const item = this.products.find((product) => product.id === id);
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
