import { IBuyer } from "../../types/index.ts";
import { IErrors } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class BuyerModel {
  protected data: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",    
  };
  constructor(protected events: IEvents) {}
  setData(userData: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...userData,
    };
    this.events.emit("buyer:changed");
  }

  getData(): IBuyer {
    return this.data;
  }

  clearData(): void {
    Object.keys(this.data).forEach((key) => {
      this.data[key as keyof IBuyer] = "";
    });
    this.events.emit("buyer:changed");
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
