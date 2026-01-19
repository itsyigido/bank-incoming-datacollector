export interface Transaction {
    id: string; // Internal UUID -- Dahili UUID
    bankId: string; // ID of you bank "akbank", "garanti", etc. 
    transactionId: string; // unique transaction ID from bank 
    senderName: string;
    amount: number;
    currency: string;
    transactionDate: Date;
    createdAt: Date;
}
