import axios from 'axios';

// Since we'll run backend on 3000 and frontend on 5173, we rely on CORS or Proxy.
// For simplicity in development, we'll hardcode or use relative if proxy set up.
// Assuming we will configure a proxy in vite.config.ts or user runs backend on localhost:3000

const API_Base = '/api'; // We will set up proxy in vite.config.ts to forward /api to http://localhost:3000

export interface Transaction {
    id: string;
    transactionId: string;
    senderName: string;
    amount: number;
    currency: string;
    transactionDate: string; // ISO string
    createdAt: string;
}

export const fetchTransactions = async (params?: any) => {
    const response = await axios.get<Transaction[]>(`${API_Base}/transactions`, { params });
    return response.data;
};

export const simulateBankTransaction = async (data?: { senderName: string, amount: string, date: string }) => {
    const response = await axios.post(`${API_Base}/simulate`, data);
    return response.data;
}
