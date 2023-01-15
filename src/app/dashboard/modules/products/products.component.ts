import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { SharedService } from '../../../core/services/shared.service';
import { ModalDeleteComponent } from '../../../core/shared/components/modal-delete/modal-delete.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getData();
    console.log(this.products);
  }

  getData() {
    return this.productService.getProduct().subscribe((response: any) => {
      if (response) {
        this.products = response.products;
      }
    });
  }

  openModallAdd() {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.componentInstance.name = 'add';
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      console.log('sdfsdf');
      this.getData();
      this.modalService.dismissAll();
    });
  }

  openModalEdit(item: Product) {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      this.modalService.dismissAll();
      this.getData();
    });
  }

  openModalDelete(item: Product) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.sendId.subscribe((result: any) => {
      this.delete(result);
      this.modalService.dismissAll();
    });
  }

  delete(item: Product) {
    console.log(item);

    return this.productService
      .deleteProduct(item._id)
      .subscribe((response: any) => {
        if (response) {
          this.sharedService.toastrSuccess(response.Message);
          this.products = this.products.filter((x: any) => x !== item);
        } else {
          this.sharedService.toastrError('Error');
        }
      });
  }
}
