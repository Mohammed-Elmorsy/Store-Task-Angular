import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  private subs = new SubSink();
  productForm: FormGroup;

  get category(): FormControl {
    return this.productForm.get('category')  as FormControl;
  }

  get title(): FormControl {
    return this.productForm.get('title')  as FormControl;
  }
  get price(): FormControl {
    return this.productForm.get('price')  as FormControl;
  }
  get description(): FormControl {
    return this.productForm.get('description')  as FormControl;
  }

  constructor(private formBuilder: FormBuilder, 
              private productsService: ProductsService,
              private router: Router) { 
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });  
  }

  ngOnInit(): void {
  }

  addProduct() {
    let newProduct = this.productForm.getRawValue();
    this.subs.add(
      this.productsService.addProduct(newProduct).subscribe(
        (product: Product) => {
          this.router.navigate(['products']);
        },
        error => {
          alert('Error in adding product');
        } 
      )
    );
    console.log(this.productForm.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
