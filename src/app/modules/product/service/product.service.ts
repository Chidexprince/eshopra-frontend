import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/models/product'



@Injectable()
export class ProductService {
  url = environment.apiUrl + '/products';
  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http
      .get<Product[]>(this.url)
      .pipe(catchError(this.errorHandler));
  }

  public getProductById(productId: number) {
    return this.http
      .get<Product>(this.url + '/' + productId)
      .pipe(catchError(this.errorHandler));
  }

  public findProductsByName(name: string) {
    return this.http
      .get<Product[]>(this.url + '/search/findByName?name=' + name)
      .pipe(catchError(this.errorHandler));
  }

  public addProduct(product: Product) {
    return this.http
      .post<any>(this.url, product)
      .pipe(catchError(this.errorHandler));
  }

  public updateProduct(product: Product) {
    return this.http
      .put<any>(this.url, product)
      .pipe(catchError(this.errorHandler));
  }

  public deleteProductById(productId: number) {
    return this.http
      .delete<Product>(this.url + '/' + productId)
      .pipe(catchError(this.errorHandler));
  }

  // Error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
