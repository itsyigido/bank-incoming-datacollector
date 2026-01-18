import { Transaction } from "../models/Transaction";

export interface TransactionFilterOptions {
    search?: string;
    minAmount?: number;
    maxAmount?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface TransactionSortOptions {
    field: 'amount' | 'transactionDate' | 'createdAt';
    order: 'asc' | 'desc';
}

export interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findByTransactionId(bankId: string, transactionId: string): Promise<Transaction | null>;
    findAll(filter?: TransactionFilterOptions, sort?: TransactionSortOptions): Promise<Transaction[]>;
}
