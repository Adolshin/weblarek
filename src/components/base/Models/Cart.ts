import { IProduct } from "../../../types/index.ts";

export class Cart {
  protected products: IProduct[] = [];

  constructor() {}

  getProducts(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct|undefined): void {
    if (product && !this.checkProduct(product.id)) {
      this.products.push(product);
    }
  }

  deleteProduct(id: string): void {
    let updatedProducts = this.products.filter((product) => product.id !== id);
    this.products = updatedProducts;
  }

  clearCart(): void {
    this.products = [];
  }

  getTotalPrice(): number {
    let total: number = 0;
    this.products.forEach((product) => {
      total += Number(product.price);
    });
    return total;
  }

  getProductQuantity(): number {
    return this.products.length;
  }

  checkProduct(id: string): boolean {
    if (this.products.find((product) => product.id === id)) {
      return true;
    } else {
      return false;
    }
  }
}
