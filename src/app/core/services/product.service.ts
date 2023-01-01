import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = environment.apiUrl + 'product/';
  constructor(private http: HttpClient) {}

  public getProductData$ = this.http.get<Product[]>(this.apiUrl + 'get').pipe(
    tap((_) => console.log('fetched products')),
    map((response: any) => response.products, console.log('map products')),
    catchError((error: Error) => {
      return throwError(error);
    }),
    shareReplay(1)
  );

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'get').pipe(
      tap((_) => console.log('fetched products')),
      // map((response: any) => response.products, console.log('map products')),
      catchError((error: Error) => {
        return throwError(error);
      })
    );
  }
  getByCat(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'getByCat/' + id);
  }
  GetById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'GetById/' + id);
  }

  addProduct(payload: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + 'add', payload);
  }

  updateProduct(product: Product, id: string): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + 'update/' + id, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + 'delete/' + id);
  }
}
