export interface Transaction {
    transactionId?: string;
    walletId: string;
    amount: number;
    type: string;
    balance?: number;
    date?: Date;
    description?: string;
}
