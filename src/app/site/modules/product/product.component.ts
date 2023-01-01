import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  catId!: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['id'];
      if (this.catId) {
        this.GetById();
      }
    });
  }

  GetById() {
    return this.productService
      .GetById(this.catId)
      .subscribe((response: any) => {
        if (response) {
          this.product = response.product;
        }
      });
  }
}
