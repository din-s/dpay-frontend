import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Wallet } from '../models/wallet';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Transaction } from '../models/transaction';
import { BalanceUpdate } from '../models/balance-update';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public rowsPerPage: number = 10;
  private baseUrl = environment.dpayBackend;
  private walletIdSubject = new BehaviorSubject<string>('');

  private walletBalanceSubject = new BehaviorSubject<BalanceUpdate>({walletId: this.walletId$.getValue(), balance: 0, asOnDate: new Date()})
  constructor(private http: HttpClient) { }

  public get walletId$(): BehaviorSubject<string> {
    return this.walletIdSubject;
  }

  public updateWalletId(walletId: string) {
    this.walletIdSubject.next(walletId);
  }

  public get walletBalance$(): BehaviorSubject<BalanceUpdate> {
    return this.walletBalanceSubject;
  }

  public updateWalletBalance(balance: number, walletId: string = this.walletId$.getValue()) {
    this.walletBalanceSubject.next({walletId: walletId, balance: balance, asOnDate: new Date()})
  }

  public setupWallet(walletName: string, initBalance: number = 0): Observable<Wallet> {
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

  public executeTransaction(txn: Transaction): Observable<Transaction> {
    const uri: string = `${this.baseUrl}/transact/${txn.walletId}`
    const body: {[key: string]: string | number} = {
      amount: txn.type == 'debit' ? -txn.amount : txn.amount,
      description: txn.description || ""
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Transaction>(uri,body, httpOptions).pipe(
      map(response => response),
      catchError(this.handleError)
    )
  }

  public getWalletDetails(id: string = this.walletId$.getValue()): Observable<Wallet> {
    const uri = `${this.baseUrl}/wallet/${id}`
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Wallet>(uri, httpOptions);
  }

  public getTransaction(id: string, page: number = 0, limit: number = 1000): Observable<any> {
    const uri = `${this.baseUrl}/transactions?walletId=${id}&skip=${this.rowsPerPage * page}&limit=${limit}`;

    const params = new HttpParams();
    params.set('walletId', id);
    params.set('skip', this.rowsPerPage * page);
    params.set('limit', limit);
    return this.http.get<any>(uri)
  }

  private handleError(error: any) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      errorMessage = 'An error occurred: ' + error.erorr.message;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${error?.error?.error || 'An unexpected error occured, please contact Admin.'}`;
    }
    return throwError(errorMessage);
  }
}
