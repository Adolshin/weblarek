import "./scss/styles.scss";
import { Catalog } from "./components/base/Models/Catalog.ts";
import { Cart } from "./components/base/Models/Cart.ts";
import { Buyer } from "./components/base/Models/Buyer.ts";
import { apiProducts } from "./utils/data.ts";


const catalog = new Catalog();
console.log('%cПроверка класса Catalog','font-weight: bold;')
catalog.setProducts(apiProducts.items);
console.log('Массив товаров из каталога', catalog.getProducts());
console.log('Товар полученный из катлога по id', catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'));
catalog.setProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')
console.log('Товар выбранный для подробного отображения', catalog.getProduct());
console.log('')

console.log('%cПроверка класса Cart','font-weight: bold;')
const cart = new Cart();
cart.addProduct(catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390'))
cart.addProduct(catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390')) //Попытка добавить имеющийся товар
cart.addProduct(catalog.getProductById('df'))
cart.addProduct(catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'))
cart.addProduct(catalog.getProductById('b06cde61-912f-4663-9751-09956c0eed67'))
console.log('Массив товаров добавленных в корзину', cart.getProducts())
cart.deleteProduct('854cef69-976d-4c2a-a18c-2aa45046c390')
console.log('Массив товаров добавленных в корзину', cart.getProducts())
console.log('Общая стоимость товаров', cart.getTotalPrice())
console.log('Количество товаров', cart.getProductQuantity())
console.log('Наличие товара в корзине', cart.checkProduct('b06cde61-912f-4663-9751-09956c0eed67'))
cart.clearCart()
console.log('Массив товаров добавленных в корзину', cart.getProducts())
console.log('')

console.log('%cПроверка класса Buyer','font-weight: bold;')
let user = new Buyer();
user.setData({ phone: "000000000"})
user.setData({ email: "1@ya.ru"})
user.setData({ address: "Москва"})
user.setData({ payment: "card"})
user.setData({ phone: "11111111",email: "2@ya.ru"})
console.log('Данные покупателя', user.getData())
console.log('Ошибки валидации', user.validateData())
user.clearData()
console.log('Данные покупателя', user.getData())
console.log('Ошибки валидации', user.validateData())
user.setData({ phone: "000000000"})
console.log('Ошибки валидации', user.validateData())




// // user.setData("phone", "00000");
// // user.setData("payment", "cabrd");

// console.log(user.getData())
// console.log(user.validateData())

// user.clearData();
// console.log(user.getData())
// console.log(user.validateData())
