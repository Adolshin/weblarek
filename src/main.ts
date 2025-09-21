import "./scss/styles.scss";
import { Catalog } from "./components/base/Models/Catalog.ts";
import { Cart } from "./components/base/Models/Cart.ts";
import { Buyer } from "./components/base/Models/Buyer.ts";
import { apiProducts } from "./utils/data.ts";

// let catalog = new Catalog();

// catalog.setProducts(apiProducts.items);

// console.log(catalog.getProducts());

// catalog.setProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
// console.log(catalog.getProduct());

// let cart = new Cart();

// const item = catalog.getProductById("b06cde61-912f-4663-9751-09956c0eed67");
// if (item) {
//   cart.addProduct(item);
// }

// const item1 = catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390");
// if (item1) {
//   cart.addProduct(item1);
// }
// const item2 = catalog.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// if (item2) {
//   cart.addProduct(item2);
// }

// const item3 = catalog.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// if (item3) {
//   cart.addProduct(item3);
// }

// console.log(cart.getProductQuantity());
// console.log(cart.getTotalPrice());
// cart.deleteProduct('b06cde61-912f-4663-9751-09956c0eed67');
// console.log(cart.getProductQuantity());
// console.log(cart.checkProduct('854cef69-976d-4c2a-a18c-2aa45046c390'));
// console.log(cart.checkProduct('b06cde61-912f-4663-9751-09956c0eed67'));

// console.log(cart.getProducts());
// cart.clear();
// console.log(cart.getProducts());

let user = new Buyer();
user.setData({ phone: "00000"});
user.setData({ email: "1@asdfs"});
user.setData({ address: "Москва"});
user.setData({ payment: "card"});
user.setData({ phone: "1111",email: "2@2"});
user.setData({ payment: "calsh"});




// user.setData("phone", "00000");
// user.setData("payment", "card");
// user.clearData();
console.log(user.getData())