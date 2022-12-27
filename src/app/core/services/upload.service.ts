import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiUrl: string = environment.apiUrl + 'upload/';
  constructor(private http: HttpClient) {}

  //=========== Upload images =========================================
  UploadImages(body: any) {
    return this.http.post(this.apiUrl, body);
  }
}
