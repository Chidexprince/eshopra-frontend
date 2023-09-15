import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/models/product'



@Injectable()
export class ProductService {
  baseUrl = environment.apiUrl + "/products";
  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get<Product>(this.baseUrl).pipe(catchError(this.errorHandler))
  }


   // Error Handler
   errorHandler(error: HttpErrorResponse) {
    return throwError(() =>error);
  }
  
}
