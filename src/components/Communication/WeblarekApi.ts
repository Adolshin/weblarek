import { IApi, IProduct, IProductListResponse, IOrder, IOrderResponse } from "../../types/index.ts";

export class WeblarekApi {
  constructor(protected baseApi: IApi, protected cdn: string) {
    this.baseApi = baseApi;
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.baseApi.get<IProductListResponse>("/product/").then(
      (data) =>
        ({
          ...data,
          items: data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image.replaceAll("svg", "png"),
          })),
        }.items)
    );
  }

  postOrder(data: IOrder): Promise<IOrderResponse> {
    return this.baseApi.post("/order/", data);
  }
}
