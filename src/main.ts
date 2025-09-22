import "./scss/styles.scss";
import { Catalog } from "./components/base/Models/Catalog.ts";
import { Cart } from "./components/base/Models/Cart.ts";
import { Buyer } from "./components/base/Models/Buyer.ts";
import { apiProducts } from "./utils/data.ts";


const catalog = new Catalog();
catalog.setProducts(apiProducts.items);
console.log('Массив товаров из каталога', catalog.getProducts());
console.log('Товар полученный из катлога по id', catalog.getProductById(apiProducts.items[0].id));
catalog.setProduct(apiProducts.items[1].id)
console.log('Товар выбранный для подробного отображения', catalog.getProduct());

const cart = new Cart();
cart.addProduct(catalog.getProductById(apiProducts.items[2].id))
cart.addProduct(catalog.getProductById(apiProducts.items[2].id))
cart.addProduct(catalog.getProductById('df'))
cart.addProduct(catalog.getProductById(apiProducts.items[4].id))
console.log('Массив товаров добавленных в корзину', cart.getProducts())
cart.deleteProduct(apiProducts.items[3].id)
console.log('Массив товаров добавленных в корзину', cart.getProducts())
console.log('Общая цена товаров', cart.getTotalPrice())
console.log('Количество товаров', cart.getProductQuantity())
console.log('Наличие товара в корзине', cart.checkProduct(apiProducts.items[4].id))
cart.clearCart()
console.log('Клрзина очищена', cart.clearCart())


// console.log(cart.getProductQuantity());
// console.log(cart.getTotalPrice());
// cart.deleteProduct('b06cde61-912f-4663-9751-09956c0eed67');
// console.log(cart.getProductQuantity());
// console.log(cart.checkProduct('854cef69-976d-4c2a-a18c-2aa45046c390'));
// console.log(cart.checkProduct('b06cde61-912f-4663-9751-09956c0eed67'));

// console.log(cart.getProducts());
// cart.clear();
// console.log(cart.getProducts());

// let user = new Buyer();
// user.setData({ phone: "00000"});
// user.setData({ email: "1@asdfs"});
// user.setData({ address: "Москва"});
// user.setData({ payment: "card"});
// user.setData({ phone: "1111",email: "2@2"});
// user.setData({ payment: "calsh"});




// // user.setData("phone", "00000");
// // user.setData("payment", "cabrd");

// console.log(user.getData())
// console.log(user.validateData())

// user.clearData();
// console.log(user.getData())
// console.log(user.validateData())
