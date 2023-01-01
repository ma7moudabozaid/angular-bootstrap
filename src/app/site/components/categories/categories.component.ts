import { Component, OnInit } from '@angular/core';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


    categories!: Category[];

    constructor(
      private categoryService: CategoryService,
    ) {}

    ngOnInit(): void {
      this.getCategory();
    }
    getCategory() {
      return this.categoryService.getCategory().subscribe((response: any) => {
        if (response) {
          this.categories = response.categories;
        }
      });
    }
  }

