import { IOrder } from "../../types/index.ts";
import { IOrderResponse } from "../../types/index.ts";
import { IProduct } from "../../types/index.ts";
import { IData } from "../../types/index.ts";
import { Api } from "../base/Api.ts";
import { IApi } from "../../types/index.ts";

export class WeblarekApi {
  constructor(protected baseApi: IApi) {
    this.baseApi = baseApi;
  }
  // get(): Promise<IData> {
  //   return this.baseApi.get<IData>("/product/");
  // }

  get() {  
    return this.baseApi.get<IData>("/product/").then(data => {
      return data.items;
    });
  }

  post(data: IOrder):any {
    return this.baseApi.post("/order/", data);
  }
}
