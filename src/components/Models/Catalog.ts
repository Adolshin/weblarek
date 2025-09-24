import { IProduct } from "../../types/index.ts";

export class Catalog {
  protected productList: IProduct[] = [];
  protected product?: IProduct;

  setProductList(data: IProduct[]): void {
    this.productList = data;
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
  }
  getProduct(): IProduct | undefined {
    return this.product;
  }
}
