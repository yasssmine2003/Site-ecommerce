import { Injectable, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import { Product } from './components/products/product.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  shoppingCartProducts: Product[] = [];
  products: Product[] = [
    {
      id: '1',
      name: 'Suit 1',
      price: 229,
      sku: 292,
      quantity: 7,
      description: 'A description about this product. Adventuring and learning Angular.',
      image: 'assets/images/suit1.png'
    },
    {
      id: '2',
      name: 'Suit 2',
      price: 119,
      sku: 291,
      quantity: 5,
      description: 'A description about this product. Adventuring and learning Angular.',
      image: 'assets/images/suit2.png'
    },
    {
      id: '3',
      name: 'Suit 3',
      price: 129,
      sku: 233,
      quantity: 10,
      description: 'A description about this product. Adventuring and learning Angular.',
      image: 'assets/images/suit3.png'
    },
    {
      id: '4',
      name: 'Suit 4',
      price: 299,
      sku: 234,
      quantity: 1,
      description: 'A description about this product. Adventuring and learning Angular.',
      image: 'assets/images/suit4.png'
    },
  ]

  isNotificationOpen: boolean = false;
  isCartModalOpen: boolean = false;
  activeProduct: Product = this.products[0];

  addProduct(product: Product) {
    const storeProducts = this.products;
    const products = this.shoppingCartProducts;
    const productIndex = products.findIndex((productA) => productA.id == product.id);
    if (productIndex == -1) {
      const targetProductIndex = storeProducts.findIndex((product) => product.id == product.id);
      product['cartQuantity'] = 1;
      storeProducts[targetProductIndex]['quantity'] -= 1;
      products.push(product);
    } else {
      const productCartQuantity = products[productIndex]?.['cartQuantity'] || 0;
      if (productCartQuantity < products[productIndex]['quantity']) {
        products[productIndex]['cartQuantity'] = productCartQuantity + 1;
      }
    }
    this.setIsCartModalOpen(true);
    this.setNotificationOpen(true);
  }

  handleProductAction(action: number, sourceProduct: Product) {
    const products = this.shoppingCartProducts;
    const productIndex = products.findIndex((product) => product.id == sourceProduct.id);
    const quantity = products?.[productIndex]?.['cartQuantity'] || 1;
    const stock = this.products;
    const targetProductIndex = stock.findIndex((product) => product.id == sourceProduct.id);
    const stockQuantity = stock[targetProductIndex]['quantity'];
    if (action == 1) {
      // increment
      if (stockQuantity == 0) return;
      products[productIndex]['cartQuantity'] = quantity + 1;
      stock[targetProductIndex]['quantity'] = stockQuantity - 1;
    } else if (action == 2) {
      // decrement
      if (quantity <= 1) return;
      products[productIndex]['cartQuantity'] = quantity - 1;
      stock[targetProductIndex]['quantity'] = stockQuantity + 1;
    } else if (action == 3) {
      // delete
      products.splice(productIndex, 1);
    }
    this.shoppingCartProducts = products;
    this.products = stock;
  }

  setNotificationOpen(boolean: boolean) {
    this.isNotificationOpen = boolean;
    setTimeout(() => this.isNotificationOpen = false, 3000)
  }

  setIsCartModalOpen(boolean: boolean) {
    this.isCartModalOpen = boolean;
  }

  get cartTotal() {
    const total = this.shoppingCartProducts.reduce((acc, product) => {
      const quantity = product?.cartQuantity || 1;
      return acc = product.price * quantity;
    }, 0)
    return total;
  }

  get getShoppingCartProducts() {
    return this.shoppingCartProducts;
  }

  get getProducts() {
    return this.products;
  }
}
