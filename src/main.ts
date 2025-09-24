import "./scss/styles.scss";
import { Catalog } from "./components/Models/Catalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { apiProducts } from "./utils/data.ts";
import { API_URL } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { WeblarekApi } from "./components/Communication/WeblarekApi.ts";


const catalog = new Catalog();
console.log("%cПроверка класса Catalog", "font-weight: bold;");
catalog.setProducts(apiProducts.items);
console.log("Массив товаров из каталога", catalog.getProducts());
console.log("Товар полученный из катлога по id", catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
catalog.setProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Товар выбранный для подробного отображения", catalog.getProduct());
console.log("");

console.log("%cПроверка класса Cart", "font-weight: bold;");
const cart = new Cart();
cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390")); //Попытка добавить имеющийся товар
cart.addProduct(catalog.getProductById("df"));
cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
cart.addProduct(catalog.getProductById("b06cde61-912f-4663-9751-09956c0eed67"));
console.log("Массив товаров добавленных в корзину", cart.getProducts());
cart.deleteProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Массив товаров добавленных в корзину", cart.getProducts());
console.log("Общая стоимость товаров", cart.getTotalPrice());
console.log("Количество товаров", cart.getProductQuantity());
console.log("Наличие товара в корзине", cart.checkProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.clearCart();
console.log("Массив товаров добавленных в корзину", cart.getProducts());
console.log("");

console.log("%cПроверка класса Buyer", "font-weight: bold;");
let user = new Buyer();
user.setData({ phone: "000000000" });
user.setData({ email: "1@ya.ru" });
user.setData({ address: "Москва" });
user.setData({ payment: "online" });
user.setData({ phone: "11111111", email: "2@ya.ru" });
console.log("Данные покупателя", user.getData());
console.log("Ошибки валидации", user.validateData());
user.clearData();
console.log("Данные покупателя", user.getData());
console.log("Ошибки валидации", user.validateData());
user.setData({ phone: "000000000" });
console.log("Ошибки валидации", user.validateData());
console.log("");

console.log("%cПроверка класса WeblarekApi", "font-weight: bold;");
const BaseApi = new Api(API_URL);
const getData = new WeblarekApi(BaseApi);

getData.get().then((data) => {
  catalog.setProducts(data);
  console.log("Массив товаров из каталога", catalog.getProducts());
  cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
  cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
  const total = {
    total: cart.getTotalPrice(),
  };
  const items = {
    items: cart.getProducts().map((product) => product.id),
  };
  user.setData({ payment: "online", email: "test@test.ru", phone: "+71234567890", address: "Spb Vosstania 1" });
  const buyer = user.getData();
  const order = { ...buyer, ...total, ...items };
  getData.post(order).then((data) => {
    console.log("Ответ сервера", data);
  });
});


