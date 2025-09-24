import { IApi, IProduct, IData, IOrder, IOrderResponse } from "../../types/index.ts";

export class WeblarekApi {
  constructor(protected baseApi: IApi) {
    this.baseApi = baseApi;
  }

  getProductList():Promise<IProduct[]> {
    return this.baseApi.get<IData>("/product/").then((data) => {
      return data.items;
    });
  }

  postOrder(data:IOrder):Promise<IOrderResponse> {
    return this.baseApi.post("/order/", data);
  }
}
