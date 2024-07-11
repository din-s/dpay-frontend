import { Routes } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ExecuteTxnComponent } from './components/execute-txn/execute-txn.component';

export const routes: Routes = [
  {
    path: 'setup',
    component: SetupComponent,
    title: 'Dpay | Wallet Setup',
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'Dpay | Transactions'
  },
  {
    path: 'execute',
    component: ExecuteTxnComponent
  }
];
