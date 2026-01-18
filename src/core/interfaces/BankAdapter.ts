import { Transaction } from "../models/Transaction";

export interface BankAdapter {
    getBankId(): string;
    normalize(rawPayload: any): Transaction | null;
    // Future: fetchTransactions() for polling
}
