import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet';
@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor() { }
  public getWalletId(): string {
    const wallet = this.getWallet();
    return wallet?.id || "";
  }

  public getWallet(): Wallet {
    const wallet = this.getItem('wallet');
    return wallet;
  }
  public getItem(key:string): any {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) || {} : null;
  }
  public setItem(key: string, value: any): void {
    const stringedValue = JSON.stringify(value);
    localStorage.setItem(key, stringedValue);
  }
}
