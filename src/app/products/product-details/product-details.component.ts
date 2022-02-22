import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private subs = new SubSink();
  productId: number = 0;
  product: Product = new Product();
  isLoading: boolean = true;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute    
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.productId = params['id'];
  
        this.getProduct();
      })
    );
  }

  getProduct() {
    this.subs.add(
      this.productsService.getProductById(this.productId).subscribe(
        (product: Product) => {
          this.product = product
        },
        error => {
          this.isLoading = false;
          alert('Error in getting product');        } 
      )
    );
  }

  stopLoading() {
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
