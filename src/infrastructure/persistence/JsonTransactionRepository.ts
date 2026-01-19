import { Transaction } from "../../core/models/Transaction";
import { TransactionRepository, TransactionFilterOptions, TransactionSortOptions } from "../../core/interfaces/TransactionRepository";
import fs from "fs/promises";
import path from "path";

export class JsonTransactionRepository implements TransactionRepository {
    private filePath = path.join(process.cwd(), "data", "transactions.json");

    private async readData(): Promise<Transaction[]> {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(data, (key, value) => {
                if (key === 'transactionDate' || key === 'createdAt') {
                    return new Date(value);
                }
                return value;
            }) as Transaction[];
        } catch (error) {
            if ((error as any).code === 'ENOENT') return [];
            console.error("Error reading db:", error);
            return [];
        }
    }

    private async writeData(data: Transaction[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    async save(transaction: Transaction): Promise<void> {
        const transactions = await this.readData();
        transactions.push(transaction);
        await this.writeData(transactions);
    }

    async findByTransactionId(bankId: string, transactionId: string): Promise<Transaction | null> {
        const transactions = await this.readData();
        return transactions.find(t => t.bankId === bankId && t.transactionId === transactionId) || null;
    }

    async findAll(filter?: TransactionFilterOptions, sort?: TransactionSortOptions): Promise<Transaction[]> {
        let transactions = await this.readData();

        // 1. Filter -- Filtrele
        if (filter) {
            if (filter.search) {
                const searchLower = filter.search.toLowerCase();
                transactions = transactions.filter(t =>
                    t.senderName.toLowerCase().includes(searchLower) ||
                    t.transactionId.toLowerCase().includes(searchLower) ||
                    t.currency.toLowerCase().includes(searchLower)
                );
            }
            if (filter.minAmount !== undefined) {
                transactions = transactions.filter(t => t.amount >= filter.minAmount!);
            }
            if (filter.maxAmount !== undefined) {
                transactions = transactions.filter(t => t.amount <= filter.maxAmount!);
            }
            if (filter.startDate) {
                transactions = transactions.filter(t => t.transactionDate >= filter.startDate!);
            }
            if (filter.endDate) {
                transactions = transactions.filter(t => t.transactionDate <= filter.endDate!);
            }
        }

        // 2. Sort -- Sırala
        if (sort) {
            transactions.sort((a, b) => {
                const fieldA = a[sort.field];
                const fieldB = b[sort.field];

                if (fieldA < fieldB) return sort.order === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return sort.order === 'asc' ? 1 : -1;
                return 0;
            });
        } else {
            // Default sort: Newest first -- Varsayılan sıralama: En yeni ilk
            transactions.sort((a, b) => b.transactionDate.getTime() - a.transactionDate.getTime());
        }

        return transactions;
    }
}
