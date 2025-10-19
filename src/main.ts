import "./scss/styles.scss";
import { IProduct, IBuyer } from "./types/index.ts";
import { API_URL, CDN_URL, EventType } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { WeblarekApi } from "./components/Communication/WeblarekApi.ts";
import { ensureElement, cloneTemplate } from "./utils/utils.ts";

import { AppModel } from "./components/Models/appModel.ts";
import { CatalogModel } from "./components/Models/CatalogModel.ts";
import { BasketModel } from "./components/Models/BasketModel.ts";
import { BuyerModel } from "./components/Models/BuyerModel.ts";

import { HeaderView } from "./components/Views/HeaderView.ts";
import { CatalogView } from "./components/Views/CatalogView.ts";
import { ModalView } from "./components/Views/ModalView.ts";
import { BasketView } from "./components/Views/BasketView.ts";
import { CardCatalogView, CardPreviewView, CardBasketView } from "./components/Views/Cards/CardsViews.ts";
import { OrderFormView, ContactsFormView } from "./components/Views/Forms/FormViews.ts";
import { SuccessView } from "./components/Views/SuccessView.ts";

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderFormTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsFormTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

const BaseApi = new Api(API_URL);
const weblarek = new WeblarekApi(BaseApi, CDN_URL);
const events = new EventEmitter();
const appModel = new AppModel(events);

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const buyerModel = new BuyerModel(events);

const headerView = new HeaderView(events, ensureElement<HTMLElement>(".header"));
const catalogView = new CatalogView(ensureElement<HTMLElement>(".gallery"));
const modalView = new ModalView(events, ensureElement<HTMLElement>(".modal"), ensureElement<HTMLElement>(".page"));
const basketView = new BasketView(events, cloneTemplate(basketTemplate));

const orderFormView = new OrderFormView(events, cloneTemplate(orderFormTemplate));
const contactsFormView = new ContactsFormView(events, cloneTemplate(contactsFormTemplate));
const successView = new SuccessView(events, cloneTemplate(successTemplate));
const cardPreview = new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
  onClick: () => {
    const activeCard = catalogModel.getProduct();
    const inBasket = basketModel.checkProduct(activeCard?.id);
    if (!inBasket) {
      events.emit(EventType.basketAdd);
    } else {
      events.emit(EventType.basketRemove, activeCard);
    }
  },
});

events.on(EventType.modalClose, () => {
  appModel.toggleModalState();
  // appModel.closeModal();
});

events.on(EventType.modalStateChanged, () => {
  modalView.render({ open: appModel.getModalState() });
});

events.on(EventType.catalogChanged, () => {
  const cards = catalogModel.getProductList().map((item) => {
    const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit(EventType.cardSelect, item),
    });
    return card.render(item);
  });
  catalogView.render({ content: cards });
});

events.on<IProduct>(EventType.cardSelect, (item) => {
  catalogModel.setProduct(item.id);
});

events.on(EventType.selectedCardChanged, () => {
  const activeCard = catalogModel.getProduct();
  const buttonState = {
    inBasket: basketModel.checkProduct(activeCard?.id),
    hasPrice: activeCard?.price !== null,
  };
  modalView.render({ content: cardPreview.render({ ...activeCard, ...buttonState }) }); 
  appModel.toggleModalState();
  // appModel.openModal();
});

events.on(EventType.basketOpen, () => {
  modalView.render({ content: basketView.render() });
  appModel.toggleModalState();
  // appModel.openModal();
});

events.on(EventType.basketAdd, () => {
  basketModel.addProduct(catalogModel.getProduct());
});

events.on<IProduct>(EventType.basketRemove, (item) => {
  basketModel.deleteProduct(item.id);
});

events.on(EventType.basketChanged, () => {
  headerView.render({ counter: basketModel.getProductQuantity() });
  const activeCard = catalogModel.getProduct();
  const buttonState = {
    inBasket: basketModel.checkProduct(activeCard?.id),
  };
  cardPreview.render(buttonState);
  const basketList = basketModel.getProductList().map((item, index) => {
    const card = new CardBasketView(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit(EventType.basketRemove, item),
    });
    return card.render(Object.assign(item, { index: index + 1 }));
  });
  const totalPrice = basketModel.getTotalPrice();
  basketView.render({ content: basketList, price: totalPrice });
});

events.on<Partial<IBuyer>>(EventType.formChanged, (item) => {
  buyerModel.setData(item);
});

events.on(EventType.buyerChanged, () => {
  const errors = buyerModel.validateData();
  const { payment, address, email, phone } = errors;
  orderFormView.render({
    payment: buyerModel.getData().payment,
    address: buyerModel.getData().address,
    valid: !address && !payment,
    errors: Object.values({ payment, address })
      .filter((i) => !!i)
      .join("; "),
  });

  contactsFormView.render({
    email: buyerModel.getData().email,
    phone: buyerModel.getData().phone,
    valid: !email && !phone,
    errors: Object.values({ email, phone })
      .filter((i) => !!i)
      .join("; "),
  });
});

events.on(EventType.orderStart, () => {
  modalView.render({ content: orderFormView.render({ errors: "" }) });
});

events.on(EventType.orderNext, () => {
  modalView.render({ content: contactsFormView.render({ errors: "" }) });
});

events.on(EventType.orderPost, () => {
  const total = { total: basketModel.getTotalPrice() }; //Обьект с ценой для post запроса
  const items = { items: basketModel.getProductList().map((product) => product.id) }; //Обьект с id товаров для post запоса
  const user = buyerModel.getData(); //Получаем данные покупателя для post запроса
  const order = { ...user, ...total, ...items }; //Собираем общий объект для post запроса
  weblarek
    .postOrder(order)
    .then((data) => {
      basketModel.clearBasket();
      buyerModel.clearData();
      modalView.render({ content: successView.render({ price: data.total }) });
    })
    .catch((err) => {
      console.error("Произошла ошибка: ", err);
    });
});

events.on(EventType.orderComplete, () => {
  appModel.toggleModalState();
  // appModel.closeModal();
});

weblarek
  .getProductList()
  .then((data) => {
    catalogModel.setProductList(data);
    basketModel.clearBasket();
  })
  .catch((err) => {
    console.error("Произошла ошибка: ", err);
  });
