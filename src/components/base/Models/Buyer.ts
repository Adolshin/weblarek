import { IBuyer } from "../../../types/index.ts";
import { Errors } from "../../../types/index.ts";
import { Payment } from "../../../types/index.ts";
import { BuyerKeys } from "../../../types/index.ts";

export class Buyer {
  protected data: IBuyer = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  constructor() {}

  validation(validationData: Partial<IBuyer>): Partial<IBuyer> {

    

    const errors: IBuyer = {
      payment: "",
      address: "",
      email: "",
      phone: "",
    };
    return errors;
  }

  setData(userData: Partial<IBuyer>): void {
    // if (userData["payment"] && userData["payment"] !== "card" && userData["payment"] !== "cash" && userData["payment"] !== "") {
    //   return;
    // }
    const mergedObject = Object.assign({}, this.data, userData);
    this.data = mergedObject;
  }

  // setData(field: BuyerKeys, value: string|Payment): void {
  //   if (field !== "payment") {
  //     this.data[field] = value;
  //   } else if (value === "card"||value === "cash"||value === ""){
  //     this.data[field] = value;
  //   }
  // }

  getData(): IBuyer {
    return this.data;
  }

  clearData(): void {
    // Object.keys(this.data).forEach((key) => {
    //   this.data[key] = '';
    // });
    this.data = {
      payment: "",
      email: "",
      phone: "",
      address: "",
    };
  }
}
