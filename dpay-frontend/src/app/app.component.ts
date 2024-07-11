import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalstoreService } from './services/localstore.service';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Wallet } from './models/wallet';
import { ExecuteTxnComponent } from "./components/execute-txn/execute-txn.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ExecuteTxnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'dpay-frontend';
  setupRequired: boolean = true;
  wallet: Wallet| null = null;
  constructor(private localStoreService: LocalstoreService) {

  }

  ngOnInit(): void {
    this.wallet = this.localStoreService.getWallet();
    if(this.wallet) {
      this.setupRequired = false;
    }
  }

  public setSetupRequired(): void {
    this.setupRequired = false;
  }
}
