import "./scss/styles.scss";
import { Catalog } from "./components/Models/Catalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";
import { apiProducts } from "./utils/data.ts";
import { API_URL, CDN_URL } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { WeblarekApi } from "./components/Communication/WeblarekApi.ts";
import { ensureElement } from "./utils/utils.ts";
import { cloneTemplate } from "./utils/utils.ts";

import { Gallery } from "./components/Views/Gallery.ts";
import { Header } from "./components/Views/Header.ts";
import { Modal } from "./components/Views/Modal.ts";
import { CardCatalog, CardPreview } from "./components/Views/Cards.ts";

const catalog = new Catalog();
const cart = new Cart();
let buyer = new Buyer();

const BaseApi = new Api(API_URL);
const weblarek = new WeblarekApi(BaseApi, CDN_URL);

const header = new Header(new EventEmitter(), ensureElement<HTMLElement>(".header"));
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const modal = new Modal(ensureElement<HTMLElement>(".modal"));

weblarek.getProductList().then((data) => {
  catalog.setProductList(data); //Записываем данные полученные с сервера в хранилище
  console.log("Массив товаров из каталога", catalog.getProductList());

  cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
  cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
  const total = { total: cart.getTotalPrice() }; //Обьект с ценой для post запроса
  console.log("Общая стоимость товаров", total.total); //Для сверки данных о стоимости в корзине и в ответе сервера
  const items = { items: cart.getProductList().map((product) => product.id) }; //Обьект с id товаров для post запоса
  buyer.setData({ payment: "online", email: "test@test.ru", phone: "+71234567890", address: "Spb Vosstania 1" }); //Записываем данные покупателя
  const user = buyer.getData(); //Получаем данные покупателя для post запроса
  const order = { ...user, ...total, ...items }; //Собираем общий объект для post запроса
  weblarek.postOrder(order).then((data) => {
    console.log("Ответ сервера", data);
  });

  header.render({ counter: cart.getProductQuantity() });

  const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
  const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
  console.log(cardCatalogTemplate);

  const cards = catalog.getProductList().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate));
    return card.render(item);
  });
  gallery.render({ catalog: cards });

  catalog.setProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
  const cardData = catalog.getProduct();
  console.log(cardData?.id)

  const card = () => {
    const card = new CardPreview(new EventEmitter(), cloneTemplate(cardPreviewTemplate));
    return card.render(cardData);
    
  };

  modal.render({ content: card() });
  // modal.openModal();
  // modal.closeModal();
});
