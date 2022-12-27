import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { SharedService } from '../../../core/services/shared.service';
import { ModalDeleteComponent } from '../../../core/shared/components/modal-delete/modal-delete.component';

import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.getCategory();
    console.log(this.categories);
  }

  getCategory() {
    return this.categoryService.getCategory().subscribe((response: any) => {
      if (response) {
        this.categories = response.categories;
      }
    });
  }

  open() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.name = '';
  }

  openModallAdd() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.name = 'add';
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      this.modalService.dismissAll();
      // this.getCategory();
    });
  }

  openModalEdit(item: Category) {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      this.modalService.dismissAll();
      this.getCategory();
    });
  }

  openModalDelete(item: Category) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.sendId.subscribe((result: any) => {
      this.delete(result);
      this.modalService.dismissAll();
    });
  }

  delete(item: Category) {
    console.log(item);

    return this.categoryService
      .deleteCategory(item._id)
      .subscribe((response: any) => {
        if (response) {
          this.sharedService.toastrSuccess(response.Message);
          this.categories = this.categories.filter((x: any) => x !== item);
        } else {
          this.sharedService.toastrError("Error");
        }
      });
  }
}
