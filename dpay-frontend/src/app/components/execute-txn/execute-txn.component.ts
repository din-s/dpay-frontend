import { UpperCasePipe, NgClass} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-execute-txn',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgClass],
  templateUrl: './execute-txn.component.html',
  styleUrl: './execute-txn.component.scss'
})
export class ExecuteTxnComponent {

  constructor(private walletService: WalletService) {}
  public isDebitTxn: boolean = true;
  public amt: number | null = null;
  public executeTransaction(): void {
    console.log('this will execute transaction');
  }

  public toggleTxn(event: any):void {
    this.isDebitTxn = !this.isDebitTxn;
  }
}
