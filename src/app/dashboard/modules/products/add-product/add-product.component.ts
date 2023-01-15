import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../core/services/shared.service';
import { ProductService } from '../../../../core/services/product.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Input() item: any;

  @Output() loadData = new EventEmitter<string>();

  formGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private uploadService: UploadService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private fb: UntypedFormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  get IsValid() {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.getFormData();
    this.getCategory();
    if (this.item) {
      this.formGroup.patchValue(this.item);
      this.formGroup.get('category')?.patchValue(this.item.category._id);
    }
  }
  getFormData() {
    this.formGroup = this.fb.group({
      _id: 0,
      name: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required],
      image: '',
      category: '',
    });
  }

  CreatData() {
    if (this.formGroup.value._id == 0) {
      this.AddData();
    } else {
      this.editData();
    }
  }
  AddData() {
    return this.productService
      .addProduct(this.formGroup.value)
      .subscribe((response: any) => {
        if (response) {
          this.sharedService.toastrSuccess('Done');
          this.formGroup.reset();
          this.getFormData();
          this.loadData.emit();
        } else {
          this.sharedService.toastrError('Error');
        }
      });
  }

  editData() {
    return this.productService
      .updateProduct(this.formGroup.value, this.formGroup.value._id)
      .subscribe((response: any) => {
        if (response) {
          this.sharedService.toastrSuccess('Done');
          this.formGroup.reset();
          this.getFormData();
          this.loadData.emit(response);
        } else {
          this.sharedService.toastrError('Error');
        }
      });
  }
  // ===============================================================================
  categories: any;
  getCategory() {
    return this.categoryService.getCategory().subscribe((response: any) => {
      if (response) {
        this.categories = response.categories;
        console.log(response);
      }
    });
  }
  // ===============================================================================

  percentDone: any = '';
  uploadPercent!: Observable<number>;

  imageSrc!: any;
  SelectFile!: any;
  imageURL!: string;
  UploadImage(event: any) {
    this.percentDone = '0%';

    if (event.target.files.length > 0) {
      this.SelectFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.SelectFile);
    }
    const formData = new FormData();
    formData.append('image', this.SelectFile);
    return this.uploadService
      .UploadImages(formData)
      .subscribe((response: any) => {
        console.log(response);
        this.imageURL = response.image;
        this.formGroup.get('image')?.setValue(response.image);
      });
  }
}
