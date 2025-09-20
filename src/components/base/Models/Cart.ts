import { IProduct } from "../../../types/index.ts";

export class Cart {
  protected products: IProduct[] = [];

  constructor() {}

  addProduct(product: IProduct): void {
    if (!this.checkProduct(product.id)) {
      this.products.push(product);
    }
  }
  deleteProduct(id: string): void {
    let updatedProducts = this.products.filter((product) => product.id !== id);
    this.products = updatedProducts;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductQuantity(): number {
    return this.products.length;
  }

  getTotalPrice(): number {
    let total: number = 0;
    this.products.forEach((product) => {
      total += Number(product.price);
    });
    return total;
  }
  checkProduct(id: string): boolean {
    if (this.products.find((product) => product.id === id)) {
      return true;
    } else {
      return false;
    }
  }
}
