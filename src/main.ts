import "./scss/styles.scss";
import { IProduct } from "./types/index.ts";
import { API_URL, CDN_URL } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { WeblarekApi } from "./components/Communication/WeblarekApi.ts";
import { ensureElement } from "./utils/utils.ts";
import { cloneTemplate } from "./utils/utils.ts";

import { CatalogModel } from "./components/Models/CatalogModel.ts";
import { BasketModel } from "./components/Models/BasketModel.ts";
import { BuyerModel } from "./components/Models/BuyerModel.ts";

import { HeaderView } from "./components/Views/HeaderView.ts";
import { GalleryView } from "./components/Views/GalleryView.ts";
import { ModalView } from "./components/Views/ModalView.ts";
import { BasketView } from "./components/Views/BasketView.ts";
import { CardCatalogView, CardPreviewView, CardBasketView } from "./components/Views/Cards/CardsViews.ts";

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");

const BaseApi = new Api(API_URL);
const weblarek = new WeblarekApi(BaseApi, CDN_URL);
const events = new EventEmitter();

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const buyerModel = new BuyerModel();

const headerView = new HeaderView(events, ensureElement<HTMLElement>(".header"));
const galleryView = new GalleryView(ensureElement<HTMLElement>(".gallery"));
const modalView = new ModalView(ensureElement<HTMLElement>(".modal"), ensureElement<HTMLElement>(".page"));
const basketView = new BasketView(events, cloneTemplate(basketTemplate));

const cardPreview = new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
  onClick: () => {
    const activeCard = catalogModel.getProduct();
    const inBasket = basketModel.checkProduct(activeCard?.id);
    if (!inBasket) {
      events.emit("basket:add");
    } else {
      events.emit("basket:remove", activeCard);
    }
  },
});

events.on("catalog:changed", () => {
  const cards = catalogModel.getProductList().map((item) => {
    const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });
  galleryView.render({ content: cards });
});

events.on<IProduct>("card:select", (item) => {
  catalogModel.setProduct(item.id);
});

events.on("selectedCard:changed", () => {
  const activeCard = catalogModel.getProduct();
  const inBasket = basketModel.checkProduct(activeCard?.id);
  const hasPrice = activeCard?.price !== null;
  cardPreview.renderButton(inBasket, hasPrice);
  modalView.render({ content: cardPreview.render(activeCard) });
  modalView.openModal();
});

events.on("basket:add", () => {
  basketModel.addProduct(catalogModel.getProduct());
});

events.on<IProduct>("basket:remove", (item) => {
  basketModel.deleteProduct(item.id);
});

events.on("basket:changed", () => {
  headerView.render({ counter: basketModel.getProductQuantity() });
  const activeCard = catalogModel.getProduct();
  const inBasket = basketModel.checkProduct(activeCard?.id);
  cardPreview.renderButton(inBasket);
  const basketList = basketModel.getProductList().map((item, index) => {
    const card = new CardBasketView(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit("basket:remove", item),
    });
    return card.render(Object.assign(item, { index: index + 1 }));
  });
  const totalPrice = basketModel.getTotalPrice();
  basketView.render({ content: basketList, price: totalPrice });
});

events.on("basket:open", () => {
  modalView.render({ content: basketView.render() });
  modalView.openModal();
});

weblarek.getProductList().then((data) => {
  catalogModel.setProductList(data); //Записываем данные полученные с сервера в хранилище
  console.log("Массив товаров из каталога", catalogModel.getProductList());
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
