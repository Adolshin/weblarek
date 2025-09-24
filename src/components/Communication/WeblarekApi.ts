import { IApi, IProduct, IData, IOrder, IOrderResponse } from "../../types/index.ts";

export class WeblarekApi {
  constructor(protected baseApi: IApi) {
    this.baseApi = baseApi;
  }

  get(): Promise<IProduct[]> {
    return this.baseApi.get<IData>("/product/").then((data) => {
      return data.items;
    });
  }

  post(data: IOrder): Promise<IOrderResponse> {
    return this.baseApi.post("/order/", data);
  }
}
