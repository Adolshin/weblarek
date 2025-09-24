import { IBuyer } from "../../types/index.ts";
import { IErrors } from "../../types/index.ts";

export class Buyer {
  protected data: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  setData(userData: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...userData,
    };
  }

  getData(): IBuyer {
    return this.data;
  }

  clearData(): void {
    Object.keys(this.data).forEach((key) => {
      this.data[key as keyof IBuyer] = "";
    });
  }

  validateData(): Partial<IErrors> {
    const errors: Partial<IErrors> = {};
    if (this.data.payment === "") {
      errors.payment = "Не выбран способ оплаты";
    }
    if (this.data.email === "") {
      errors.email = "Не указан email";
    }
    if (this.data.phone === "") {
      errors.phone = "Не указан телефон";
    }
    if (this.data.address === "") {
      errors.address = "Не указан адрес";
    }
    return errors;
  }
}
