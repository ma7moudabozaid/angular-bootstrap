import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

    products!: Product[];
    catId!: string;
    constructor(
      private productService: ProductService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.catId = params['id'];

        if (this.catId) {
          this.getByCat();
        } else {
          this.getData();
        }
      });
    }

    getData() {
      return this.productService.getProduct().subscribe((response: any) => {
        if (response) {
          this.products = response.products;
        }
      });
    }

    getByCat() {
      return this.productService
        .getByCat(this.catId)
        .subscribe((response: any) => {
          if (response) {
            this.products = response.products;
          }
        });
    }
  }
