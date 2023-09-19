import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  url = environment.apiUrl + '/product-category';

  constructor(private http: HttpClient) {}

  public getProductCategory() {
    return this.http
      .get<ProductCategory[]>(this.url)
      .pipe(catchError(this.errorHandler));
  }

  public getProductCategoryById(categoryId: number) {
    return this.http
      .get<ProductCategory>(this.url + '/' + categoryId)
      .pipe(catchError(this.errorHandler));
  }

  public getProductsByCategoryId(categoryId: number) {
    return this.http
      .get<Product[]>(this.url + '/' + categoryId + '/products')
      .pipe(catchError(this.errorHandler));
  }

  public addProductCategory(productCategory: ProductCategory) {
    return this.http
      .post<any>(this.url, productCategory)
      .pipe(catchError(this.errorHandler));
  }

  public updateProductCategory(productCategory: ProductCategory) {
    return this.http
      .put<any>(this.url, productCategory)
      .pipe(catchError(this.errorHandler));
  }

  public deleteProductById(categoryId: number) {
    return this.http
      .delete<ProductCategory>(this.url + '/' + categoryId)
      .pipe(catchError(this.errorHandler));
  }

  // Error Handler
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
