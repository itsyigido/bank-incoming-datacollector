import { TransactionRepository } from "../interfaces/TransactionRepository";
import { BankAdapter } from "../interfaces/BankAdapter";
import { Transaction } from "../models/Transaction";

export class TransactionService {
    constructor(private transactionRepository: TransactionRepository) { }

    async processWebhook(adapter: BankAdapter, rawPayload: any): Promise<Transaction | null> {
        // 1. Normalize
        const transaction = adapter.normalize(rawPayload);

        if (!transaction) {
            console.warn("Failed to normalize transaction", rawPayload);
            return null; // Or throw error
        }

        // 2. Check for duplicate
        const existing = await this.transactionRepository.findByTransactionId(transaction.bankId, transaction.transactionId);
        if (existing) {
            console.log(`Transaction ${transaction.transactionId} already exists. Skipping.`);
            return existing;
        }

        // 3. Save
        await this.transactionRepository.save(transaction);
        console.log(`Transaction ${transaction.transactionId} saved successfully.`);

        return transaction;
    }

    async getAllTransactions(filter?: any, sort?: any): Promise<Transaction[]> {
        return this.transactionRepository.findAll(filter, sort);
    }
}
