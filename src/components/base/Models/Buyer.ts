import { IBuyer } from "../../../types/index.ts";
import { IErrors } from "../../../types/index.ts";

export class Buyer {
  protected data: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  constructor() {}

  setData(userData: Partial<IBuyer>): void {
    if (userData["payment"] && userData["payment"] !== "card" && userData["payment"] !== "cash" && userData["payment"] !== "") {
      return;
    }
    const mergedObject = Object.assign({}, this.data, userData);
    this.data = mergedObject;
  }

  // setData(field: BuyerKeys, value: string | Payment): void {
  //   function isPayment(value: string): value is Payment {
  //     return value === "card" || value === "cash";
  //   }
  //   if (field !== "payment") {
  //     this.data[field] = value;
  //   } else if (isPayment(value)) {
  //     this.data[field] = value;
  //   }
  // }

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
