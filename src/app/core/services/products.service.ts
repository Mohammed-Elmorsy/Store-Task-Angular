import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(limit?: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseURL}/products?limit=${limit}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseURL}/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.baseURL}/products`, product);
  }
}
