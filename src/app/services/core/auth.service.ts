import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../models/app.config';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BadInput } from 'src/app/services/error/bad-input';
import { NotFoundError } from 'src/app/services/error/not-found-error';
import { UnAuthorized } from 'src/app/services/error/unauthorized-error';
import { AppError } from 'src/app/services/error/app-error';


// import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) {}

  public setFieldDataToStorage(fieldName: string, fieldData: any) {
    localStorage.setItem(fieldName, fieldData);
  }

  public getFieldDataFromStorage(fieldName: string) {
    return localStorage.getItem(fieldName);
  }

  public async clearFieldDataFromStorage(fieldName: string) {
    await localStorage.removeItem(fieldName);
  }

  public async logout() {
    this.clearFieldDataFromStorage('blogvio-token');
    this.router.navigateByUrl('/login');
  }

  public setCurrentUser(currentUser) {
    localStorage.setItem('current-user', JSON.stringify(currentUser));
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem('current-user'));
  }

  public getDecodedAccessToken(token: string): any {
    try {
      // return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public register(credentials: object): Observable<any> {
    const url = AppConfig.getHostPath() + '/api/v1/users/register';

    return this.http.post(url, credentials)
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public login(credentials: object): Observable<any> {
    const url = AppConfig.getHostPath() + '/api/v1/users/login';

    return this.http.post(url, credentials)
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 401) {
      return throwError(new UnAuthorized(error));
    }
    return throwError(new AppError(error));
  }
}
