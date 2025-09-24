import { IProduct } from "../../types/index.ts";

export class Cart {
  protected products: IProduct[] = [];

  constructor() {}

  getProductList(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct | undefined): void {
    if (product && !this.checkProduct(product.id)) {
      this.products.push(product);
      console.log("Товар добавлен а корзину"); //для проверки
    } else if (product && this.checkProduct(product.id)) {
      console.log("Товар с таким id уже есть в корзине"); //для проверки
    }
  }

  deleteProduct(id: string): void {
    const updatedProducts = this.products.filter((product) => product.id !== id);
    this.products = updatedProducts;
    console.log("Товар удаален из корзины"); //для проверки
  }

  clearCart(): void {
    this.products = [];
    console.log("Корзина очищена"); //для проверки
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
