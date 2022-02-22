import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { ProductsService } from 'src/app/core/services/products.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  private subs = new SubSink();
  products: Product[] = [];
  isLoading: boolean = true;
  limit: number = 10;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  trackById(index: number, obj: any) {
    return obj.id;
  }

  getProducts(limit?: number): void {
    this.subs.add(
      this.productsService.getProducts(limit).subscribe(
        (products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        }, 
        error => {
          this.isLoading = false;
          alert('Error in getting products');        
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
