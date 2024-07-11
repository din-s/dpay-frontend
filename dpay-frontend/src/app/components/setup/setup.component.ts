import { Component, OnInit } from '@angular/core';
import { LocalstoreService } from '../../services/localstore.service';
import { WalletService } from '../../services/wallet.service';
import { Wallet } from '../../models/wallet';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
  // providers: [WalletService]
})
export class SetupComponent implements OnInit{
  public walletName: string = "";
  public initBalance: number | undefined = 0;
  public errorMessage: string = "";
  public wallet: Wallet | null = null;
  public walletExist: boolean = false;
  constructor(private lsStore: LocalstoreService, private walletService: WalletService, private toastService: ToastrService, private router: Router) {}

  public setupWallet() {
    const inProgressToast = this.toastService.info('Setup in progress..', 'INPROGRESS', {tapToDismiss: false})
    this.walletService.setupWallet(this.walletName, this.initBalance).subscribe((response) => {
      this.toastService.clear(inProgressToast.toastId);
      this.toastService.success('Wallet Setup Success', 'SUCCESS')
      this.wallet = response;
      this.errorMessage = ""
      // mount this wallet information to the localStorage
      this.lsStore.setItem('wallet', this.wallet);
      this.router.navigateByUrl('/execute');
    }, (error) => {
      this.toastService.clear(inProgressToast.toastId);
      this.toastService.error(error.message, 'WALLET SETUP FAILED');
      this.errorMessage = error.message;
      this.wallet = null;
    })
  }

  ngOnInit(): void {
    if(this.lsStore.getWalletId()) {
      // wallet exist go to dashboard
      this.walletExist = true; // may be used in the future to re-direct to dashboard with re-direction message to user. Not required at the moment
      setTimeout(() => {
        this.router.navigateByUrl("/");
      }, 3000)
    }
  }

}