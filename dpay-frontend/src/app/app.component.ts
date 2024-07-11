import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalstoreService } from './services/localstore.service';
import { CommonModule } from '@angular/common';
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
  title = 'D-pay, PayAnyTiMe Anywhere';
  public wallet!: Wallet;
  public asOn!: Date;
  public walletBalance: number = 0;
  constructor(
    private localStoreService: LocalstoreService, 
    private walletService: WalletService,
    private toastService: ToastrService, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.walletService.walletBalance$.subscribe((update) => {
      this.walletBalance = update.balance;
      this.asOn = update.asOnDate;
    })
    this.wallet = this.localStoreService.getWallet();
    if(this.wallet) {
      // fetch latest wallet details
      this.walletService.getWalletDetails(this.wallet.id).subscribe((details) => {
        this.wallet = details;
        this.walletService.updateWalletBalance(details.balance)
        this.router.navigateByUrl('/execute');
      }, (error) => {
        this.toastService.error('Unable to fetch latest details of wallet from the server', 'UNABLE TO FETCH LATEST WALLET');
        console.error(error)
      })
    }
  }

  public handleWalletCreation(walletInfo: any): void {
    this.wallet = walletInfo;
  }
}
