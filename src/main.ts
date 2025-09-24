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
catalog.setProductList(apiProducts.items);
console.log("Массив товаров из каталога", catalog.getProductList());
console.log("Товар полученный из катлога по id", catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
catalog.setProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Товар выбранный для подробного отображения", catalog.getProduct());
console.log("");

console.log("%cПроверка класса Cart", "font-weight: bold;");
// На повышения безопасности данных обработаны ситуации которые врядли возможны при корректной реализации других слоев (некорректный id и повторное добавление товара)
const cart = new Cart();
cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390")); //Попытка добавить товар который уже есть в корзине
cart.addProduct(catalog.getProductById("df")); //Попытка добавить товар с некорректным id
cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log("Массив товаров добавленных в корзину", cart.getProductList());
cart.deleteProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Массив товаров добавленных в корзину", cart.getProductList());
console.log("Общая стоимость товаров", cart.getTotalPrice());
console.log("Количество товаров", cart.getProductQuantity());
console.log("Наличие товара в корзине", cart.checkProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.clearCart();
console.log("Массив товаров добавленных в корзину", cart.getProductList());
console.log("");

console.log("%cПроверка класса Buyer", "font-weight: bold;");
let user = new Buyer();
user.setData({ phone: "000000000" }); //Добавляем данные по одному свойству
user.setData({ email: "1@ya.ru" });
user.setData({ address: "Москва" });
user.setData({ payment: "online" });
console.log("Данные покупателя", user.getData());
user.setData({ phone: "11111111", email: "2@ya.ru" }); //Добавляем данные группой свойств
console.log("Данные покупателя", user.getData()); //Проверяем корректность перезаписи данных
console.log("Ошибки валидации", user.validateData()); // Все поля есть получаем пустой объект ошибок валидации
user.clearData();
console.log("Данные покупателя", user.getData()); //Проверяем корректность удаления данных
console.log("Ошибки валидации", user.validateData()); // Получаем полный обьект ошибок валидации при незаполненых полях
user.setData({ phone: "000000000" }); //Добавляем одно поле
console.log("Ошибки валидации", user.validateData()); // Получаем полный обьект валидации при частично заполненых полях
console.log("");

console.log("%cПроверка класса WeblarekApi", "font-weight: bold;");

const BaseApi = new Api(API_URL);
const weblarek = new WeblarekApi(BaseApi);

weblarek.getProductList().then((data) => {
  catalog.setProductList(data); //Записываем данные полученные с сервера в хранилище
  console.log("Массив товаров из каталога", catalog.getProductList());

  // post запрос проверяется с использованием данных полученных из классов
  cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390")); //Добавляем товар в корзину
  cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")); //Добавляем товар в корзину

  const total = { total: cart.getTotalPrice() }; //Обьект с ценой для post запроса
  console.log("Общая стоимость товаров", total.total); //Для сверки данных о стоимости в корзине и в ответе сервера
  const items = { items: cart.getProductList().map((product) => product.id) }; //Обьект с id товаров для post запоса
  user.setData({ payment: "online", email: "test@test.ru", phone: "+71234567890", address: "Spb Vosstania 1" }); //Записываем данные покупателя
  const buyer = user.getData(); //Получаем данные покупателя для post запроса
  const order = { ...buyer, ...total, ...items }; //Собираем общий объект для post запроса

  weblarek.postOrder(order).then((data) => {
    console.log("Ответ сервера", data);
  });
});
