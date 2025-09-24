import { IProduct } from "../../types/index.ts";

export class Cart {
  protected productList: IProduct[] = [];

  getProductList(): IProduct[] {
    return this.productList;
  }

  addProduct(product: IProduct | undefined): void {
    if (product && !this.checkProduct(product.id)) {
      this.productList.push(product);
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
