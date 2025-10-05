import { IApi, IProduct, IProductListResponse, IOrder, IOrderResponse } from "../../types/index.ts";

export class WeblarekApi {
  constructor(protected baseApi: IApi) {
    this.baseApi = baseApi;
  }

  getProductList():Promise<IProduct[]> {
    return this.baseApi.get<IProductListResponse>("/product/").then((data) => {
      return data.items;
    });
  }
  //   getProductList(): Promise<IData> {
  //   return this.apiClient.get<IData>('/product/').then((data) => ({
  //     ...data,
  //     items: data.items.map((item) => ({
  //       ...item,
  //       image: this.cdn + item.image,
  //     })),
  //   }));
  // }

  postOrder(data:IOrder):Promise<IOrderResponse> {
    return this.baseApi.post("/order/", data);
  }
}
