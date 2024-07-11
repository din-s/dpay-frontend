import { UpperCasePipe, NgClass} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { LocalstoreService } from '../../services/localstore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-execute-txn',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgClass],
  templateUrl: './execute-txn.component.html',
  styleUrl: './execute-txn.component.scss'
})
export class ExecuteTxnComponent implements OnInit {

  constructor(private walletService: WalletService, private localStore: LocalstoreService, private toastService: ToastrService) {}
  public isDebitTxn: boolean = true;
  public amt!: number | null;
  public desc: string = '';
  public walletId: string = '';
  public errorMessage: string = '';
  ngOnInit(): void {
    this.walletId = this.localStore.getWalletId();
  }
  public executeTransaction(): void {
    const txn = {
      amount: this.amt || 0,
      description: this.desc,
      walletId: this.walletId,
      type: this.isDebitTxn ? 'debit' : 'credit'
    }
    const inProgressToast = this.toastService.info('executing...', 'INPROGRESS')
    this.walletService.executeTransaction(txn).subscribe((response) => {
      this.toastService.clear(inProgressToast.toastId);
      this.toastService.success('Transaction executed Successfully', 'TRANSACTION SUCCESS')
      this.errorMessage = ""
      this.amt = null;
      this.desc = "";
      this.walletService.updateWalletBalance(Number(response.balance))
    }, (error) => {
      this.toastService.clear(inProgressToast.toastId);
      console.log("txn error", error)
      this.toastService.error(error, 'LAST TRANSACTION FAILED');
      this.errorMessage = error.message;
    })
  }

  public toggleTxn(event: any):void {
    this.isDebitTxn = !this.isDebitTxn;
  }
}
