import "./scss/styles.scss";
import { IProduct } from "./types/index.ts";
import { API_URL, CDN_URL } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { WeblarekApi } from "./components/Communication/WeblarekApi.ts";
import { ensureElement } from "./utils/utils.ts";
import { cloneTemplate } from "./utils/utils.ts";

import { Catalog } from "./components/Models/Catalog.ts";
import { Cart } from "./components/Models/Cart.ts";
import { Buyer } from "./components/Models/Buyer.ts";

import { Header } from "./components/Views/Header.ts";
import { Gallery } from "./components/Views/Gallery.ts";
import { Modal } from "./components/Views/Modal.ts";
import { Basket } from "./components/Views/Basket.ts";
import { CardCatalog, CardPreview, CardBasket } from "./components/Views/Cards/Cards.ts";

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");

const BaseApi = new Api(API_URL);
const weblarek = new WeblarekApi(BaseApi, CDN_URL);
const events = new EventEmitter();

const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer();

const header = new Header(events, ensureElement<HTMLElement>(".header"));
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const modal = new Modal(ensureElement<HTMLElement>(".modal"), ensureElement<HTMLElement>(".page"));
const basket = new Basket(events, cloneTemplate(basketTemplate));

const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
  onClick: () => {
    const inBasket = cart.checkProduct(catalog.getProduct()?.id);
    if (!inBasket) {
      events.emit("basket:add");
    } else {
      events.emit("basket:remove", catalog.getProduct());
    }
  },
});

events.on("catalog:changed", () => {
  const cards = catalog.getProductList().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });
  gallery.render({ content: cards });
});

events.on<IProduct>("card:select", (item) => {
  catalog.setProduct(item.id);
});

events.on("selectedCard:changed", () => {
  const activeCard = catalog.getProduct();
  const inBasket = cart.checkProduct(activeCard?.id);
  const unavailable = activeCard?.price === null;
  if (!unavailable) {
    if (!inBasket) {
      cardPreview.buttonElement.textContent = "Купить";
      cardPreview.buttonElement.removeAttribute("disabled");
    } else {
      cardPreview.buttonElement.textContent = "Удалить из корзины";
      cardPreview.buttonElement.removeAttribute("disabled");
    }
  } else {
    cardPreview.buttonElement.setAttribute("disabled", "");
    cardPreview.buttonElement.textContent = "Недоступно";
  }
  modal.render({ content: cardPreview.render(activeCard) });
  modal.openModal();
});

events.on("basket:add", () => {
  cart.addProduct(catalog.getProduct());
});

events.on<IProduct>("basket:remove", (item) => {
  cart.deleteProduct(item.id);
});

events.on("basket:changed", () => {
  header.render({ counter: cart.getProductQuantity() });
  const activeCard = catalog.getProduct();
  const inBasket = cart.checkProduct(activeCard?.id);
  if (!inBasket) {
    cardPreview.buttonElement.textContent = "Купить";
  } else {
    cardPreview.buttonElement.textContent = "Удалить из корзины";
  }
  const basketList = cart.getProductList().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit("basket:remove", item),
    });
    return card.render(Object.assign(item, { index: index + 1 }));
  });
  basket.render({ content: basketList });
});

events.on("basket:open", () => {
  modal.render({ content: basket.render() });
  modal.openModal();
});

weblarek.getProductList().then((data) => {
  catalog.setProductList(data); //Записываем данные полученные с сервера в хранилище
  console.log("Массив товаров из каталога", catalog.getProductList());
  // console.log(catalog);
  // cart.addProduct(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"));
  // cart.addProduct(catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
  // const total = { total: cart.getTotalPrice() }; //Обьект с ценой для post запроса
  // console.log("Общая стоимость товаров", total.total); //Для сверки данных о стоимости в корзине и в ответе сервера
  // const items = { items: cart.getProductList().map((product) => product.id) }; //Обьект с id товаров для post запоса
  // buyer.setData({ payment: "online", email: "test@test.ru", phone: "+71234567890", address: "Spb Vosstania 1" }); //Записываем данные покупателя
  // const user = buyer.getData(); //Получаем данные покупателя для post запроса
  // const order = { ...user, ...total, ...items }; //Собираем общий объект для post запроса
  // weblarek.postOrder(order).then((data) => {
  //   console.log("Ответ сервера", data);
  // });
});
