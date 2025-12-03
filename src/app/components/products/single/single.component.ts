import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})

export class SingleComponent implements OnInit {

  undefinedProduct: boolean = true;

  constructor(
    public appService: AppService,
    public route: ActivatedRoute,
  ) {}

  product: Product = this.appService.getProducts[0];

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const { variable: productId } = param;
        this.undefinedProduct = false;
        const products = this.appService.getProducts;
        const indexOfProduct = products.findIndex((product) => product.id == productId);
        if (!indexOfProduct) {
          this.undefinedProduct = true;
        } else {
          this.undefinedProduct = false;
          this.product = products[indexOfProduct];
        }
    })
  }

  get getProductId() {
    return this.product;
  }
}
