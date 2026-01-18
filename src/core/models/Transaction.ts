export interface Transaction {
    id: string; // Internal UUID
    bankId: string; // "akbank", "garanti", etc.
    transactionId: string; // Bank's unique ID
    senderName: string;
    amount: number;
    currency: string;
    transactionDate: Date;
    createdAt: Date;
}
