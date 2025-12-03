import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(
    public appService: AppService
  ) {

  }
  activeProduct: Product | null = null

  setProduct(id: number) {
    const productIndex = this.appService.getProducts.findIndex((product) => product.id == id.toString())
    this.activeProduct = this.appService.getProducts[productIndex];
  }
}
