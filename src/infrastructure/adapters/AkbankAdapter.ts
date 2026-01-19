import { BankAdapter } from "../../core/interfaces/BankAdapter";
import { Transaction } from "../../core/models/Transaction";
import { v4 as uuidv4 } from 'uuid';

export class AkbankAdapter implements BankAdapter {
    getBankId(): string {
        return "akbank";
    }

    /**
     * Normalizes Akbank webhook payload. -- Akbank webhook yükünü normalize eder.
     * 
     * Expected Payload Structure (Example based on common formats): -- Beklenen Yük Yapısı (Yaygın formatlara dayalı örnek):
     * {
     *   "TransferId": "TRX-123456",
     *   "Sender": "Ahmet Yilmaz",
     *   "Amount": 150.00,
     *   "Currency": "TRY",
     *   "Date": "2023-10-27T10:00:00Z"
     * }
     */
    normalize(rawPayload: any): Transaction | null {
        try {
            // Basic validation/presence check -- Basit doğrulama/varlık kontrolü
            if (!rawPayload.TransferId || !rawPayload.Amount) {
                return null;
            }

            return {
                id: uuidv4(),
                bankId: this.getBankId(),
                transactionId: rawPayload.TransferId,
                senderName: rawPayload.Sender || "Unknown",
                amount: parseFloat(rawPayload.Amount),
                currency: rawPayload.Currency || "TRY",
                transactionDate: new Date(rawPayload.Date || Date.now()),
                createdAt: new Date()
            };
        } catch (error) {
            console.error("Akbank normalization error:", error);
            return null;
        }
    }
}
