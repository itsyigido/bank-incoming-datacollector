import React, { useState, useEffect } from 'react';
import { fetchTransactions, simulateBankTransaction, Transaction } from '../services/api';
import './TransactionDashboard.css';

const TransactionDashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        minAmount: '',
        maxAmount: '',
        startDate: '',
        endDate: ''
    });
    const [sort, setSort] = useState({ field: 'transactionDate', order: 'desc' });

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [simData, setSimData] = useState({
        senderName: '',
        amount: '',
        date: new Date().toISOString().slice(0, 16) // Default to current datetime-local format
    });

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchTransactions({
                ...filters,
                sortField: sort.field,
                sortOrder: sort.order
            });
            setTransactions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [filters, sort]);

    const handleSimulateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await simulateBankTransaction(simData);
            setShowModal(false);
            // Reset form
            setSimData({ senderName: '', amount: '', date: new Date().toISOString().slice(0, 16) });
            await loadData();
        } catch (err) {
            alert("Simulation failed!");
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard">
            <header className="header">
                <h1>Bank Transactions</h1>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    Simulate Bank +
                </button>
            </header>

            {/* Modal Overlay */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Simulate Transaction</h2>
                        <form onSubmit={handleSimulateSubmit}>
                            <div className="form-group">
                                <label>Sender Name</label>
                                <input
                                    type="text"
                                    required
                                    value={simData.senderName}
                                    onChange={(e) => setSimData({ ...simData, senderName: e.target.value })}
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={simData.amount}
                                    onChange={(e) => setSimData({ ...simData, amount: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={simData.date}
                                    onChange={(e) => setSimData({ ...simData, date: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="controls">
                <input
                    type="text"
                    name="search"
                    placeholder="Search sender, ID..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="input-search"
                />
                <div className="filter-group">
                    <input
                        type="number" name="minAmount" placeholder="Min Amount"
                        value={filters.minAmount} onChange={handleFilterChange}
                    />
                    <input
                        type="number" name="maxAmount" placeholder="Max Amount"
                        value={filters.maxAmount} onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
                    <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
                </div>
                <select
                    value={sort.field}
                    onChange={(e) => setSort({ ...sort, field: e.target.value })}
                >
                    <option value="transactionDate">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <select
                    value={sort.order}
                    onChange={(e) => setSort({ ...sort, order: e.target.value })}
                >
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                </select>
            </div>

            <div className="table-container">
                {loading ? <p>Loading...</p> : (
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Sender</th>
                                <th>Transaction ID</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>{new Date(t.transactionDate).toLocaleString()}</td>
                                    <td>{t.senderName}</td>
                                    <td><span className="badge">{t.transactionId}</span></td>
                                    <td className="text-right font-bold">
                                        {t.amount.toLocaleString(undefined, { style: 'currency', currency: t.currency })}
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center">No transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TransactionDashboard;
