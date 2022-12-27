import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { SharedModule } from "../../../core/shared/shared.module";

@NgModule({
  declarations: [ProductsComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ],
})
export class ProductsModule {}
