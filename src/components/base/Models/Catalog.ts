import { IProduct } from "../../../types/index.ts";

export class Catalog {
  protected products: IProduct[] = [];
  protected product?: IProduct;
  constructor() {}

  setProducts(data: IProduct[]): void {
    this.products = data;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  setProduct(id: string): void{
    const product = this.products.find((product) => product.id === id);
    this.product = product
    
  }
  getProduct(): IProduct | undefined {
    return this.product;
  }
  
  getProductById(id: string): IProduct|undefined{
    return this.products.find((product) => product.id === id);
  }
}
