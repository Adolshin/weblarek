/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export enum EventType {
  catalogChanged = "catalog:changed",
  selectedCardChanged = "selectedCard:changed",
  cardSelect = "card:select",
  basketOpen = "basket:open",
  basketAdd = "basket:add",
  basketRemove = "basket:remove",
  basketChanged = "basket:changed",
  formChanged = "form:changed",
  buyerChanged = "buyer:changed",
  orderStart = "order:start",
  orderNext = "order:next",
  orderPost = "order:post",
  orderComplete = "order:complete",
  modalStateChanged = "modalState:changed",
  modalClose = "modal:close"
}