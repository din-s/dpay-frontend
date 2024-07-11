import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Wallet } from '../models/wallet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl = environment.dpayBackend
  constructor(private http: HttpClient) { }

  public setupWallet(walletName: string, initBalance: number = 0): Observable<Wallet> {
    const wallet: Wallet = {id: "abc123", name: 'sample', balance: 34, date: new Date};
    const uri: string = `${this.baseUrl}/setup`;
    const body: {[key: string]: string | number} = {
      name: walletName,
      balance: initBalance
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Wallet>(uri,body, httpOptions).pipe(
      map(response => response),
      catchError(this.handleError)
    )
  }

  private handleError(error: any) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred: ' + error.erorr.message;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
