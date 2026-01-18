import { Router, Request, Response } from 'express';
import { TransactionService } from '../core/services/TransactionService';
import { JsonTransactionRepository } from '../infrastructure/persistence/JsonTransactionRepository';
import { AkbankAdapter } from '../infrastructure/adapters/AkbankAdapter';
import axios from 'axios';

const router = Router();

const transactionRepository = new JsonTransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const akbankAdapter = new AkbankAdapter();

router.post('/webhooks/akbank', async (req: Request, res: Response) => {
    try {
        const result = await transactionService.processWebhook(akbankAdapter, req.body);
        if (result) {
            res.status(200).json({ status: 'success', message: 'Transaction processed', id: result.id });
        } else {
            res.status(400).json({ status: 'error', message: 'Invalid payload' });
        }
    } catch (error) {
        console.error("Webhook processing error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

router.get('/api/transactions', async (req: Request, res: Response) => {
    try {
        const { search, minAmount, maxAmount, startDate, endDate, sortField, sortOrder } = req.query;

        const filter = {
            search: search ? String(search) : undefined,
            minAmount: minAmount ? Number(minAmount) : undefined,
            maxAmount: maxAmount ? Number(maxAmount) : undefined,
            startDate: startDate ? new Date(String(startDate)) : undefined,
            endDate: endDate ? new Date(String(endDate)) : undefined,
        };

        const sort = sortField ? {
            field: String(sortField) as any,
            order: String(sortOrder || 'desc') as any
        } : undefined;

        const transactions = await transactionService.getAllTransactions(filter, sort);
        res.json(transactions);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// New Simulation Endpoint
router.post('/api/simulate', async (req: Request, res: Response) => {
    try {
        const { senderName, amount, date } = req.body;

        const payload = {
            "TransferId": "TRX-" + Math.floor(Math.random() * 10000000),
            "Sender": senderName || ("Digital User " + Math.floor(Math.random() * 100)),
            "Amount": amount ? String(amount) : (Math.random() * 10000).toFixed(2),
            "Currency": "TRY",
            "Date": date ? new Date(date).toISOString() : new Date().toISOString()
        };

        // Internal loopback to trigger our own webhook logic, 
        // effectively simulating an external call.
        // const payload = {
        //     "TransferId": "TRX-" + Math.floor(Math.random() * 10000000),
        //     "Sender": "Digital User " + Math.floor(Math.random() * 100),
        //     "Amount": (Math.random() * 10000).toFixed(2),
        //     "Currency": "TRY",
        //     "Date": new Date().toISOString()
        // };

        // We can call the service directly or trigger the webhook route. 
        // Triggering the webhook route tests the parsing logic too.
        // But for simplicity/speed here, we can just call the method:
        // await transactionService.processWebhook(akbankAdapter, payload);
        // OR better, we use axios to call our own webhook endpoint to ensure full flow 
        // (but need to know port).

        // Simplest valid "Unit" simulation:
        const result = await transactionService.processWebhook(akbankAdapter, payload);
        res.json({ message: "Simulation triggered", result });

    } catch (error) {
        res.status(500).json({ error: "Simulation failed" });
    }
});

export default router;
