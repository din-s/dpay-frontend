import { Component, OnInit, SimpleChange } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalstoreService } from './services/localstore.service';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Wallet } from './models/wallet';
import { ExecuteTxnComponent } from "./components/execute-txn/execute-txn.component";
import { WalletService } from './services/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupComponent } from "./components/setup/setup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ExecuteTxnComponent, RouterLink, FontAwesomeModule, SetupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Dpay, PayAnyTiMe Anywhere';
  setupRequired: boolean = true;
  wallet: Wallet| null = null;
  public asOn: string = "";
  constructor(private localStoreService: LocalstoreService, private walletService: WalletService, private toastService: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.wallet = this.localStoreService.getWallet();
    if(this.wallet) {
      this.setupRequired = false;
      // fetch latest wallet details
      this.walletService.getWalletDetails(this.wallet.id).subscribe((details) => {
        this.wallet = details;
        this.localStoreService.setItem('balance', {balance: this.wallet.balance, asOn: new Date()})
        this.asOn = new Date().toString();
        this.router.navigateByUrl('/execute');
      }, (error) => {
        this.toastService.error('Unable to fetch latest details of wallet from the server', 'UNABLE TO FETCH LATEST WALLET');
        console.error(error)
      })
    }
  }

  public isActive(url: string) {
    return this.router.isActive(url, true)
  }

  public setSetupRequired(): void {
    this.setupRequired = false;
  }
}
