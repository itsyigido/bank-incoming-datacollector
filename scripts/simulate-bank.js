"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const API_URL = 'http://localhost:3000';
function simulate() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("--- Starting Simulation ---");
        // 1. Send legitimate Akbank Webhook -- 1. Meşru Akbank Webhook'u gönder
        console.log("\n1. Sending Akbank Webhook...");
        const payload = {
            "TransferId": "TRX-" + Math.floor(Math.random() * 1000000),
            "Sender": "Simulated User",
            "Amount": 500.25,
            "Currency": "TRY",
            "Date": new Date().toISOString()
        };
        try {
            const webhookRes = yield axios_1.default.post(`${API_URL}/webhooks/akbank`, payload);
            console.log("Webhook Response:", webhookRes.data);
        }
        catch (e) {
            console.error("Webhook Failed:", e.message);
        }
        // 2. Verify Data via API -- 2. API aracılığıyla Verileri Doğrula
        console.log("\n2. Verifying data...");
        try {
            const listRes = yield axios_1.default.get(`${API_URL}/api/transactions`);
            console.log("Current Transactions in DB:", listRes.data);
        }
        catch (e) {
            console.error("Fetch Failed:", e.message);
        }
        // 3. Send Duplicate Webhook -- 3. Yinelenen Webhook'u Gönder
        console.log("\n3. Sending Duplicate Webhook...");
        try {
            const webhookRes = yield axios_1.default.post(`${API_URL}/webhooks/akbank`, payload);
            console.log("Duplicate Webhook Response:", webhookRes.data);
        }
        catch (e) {
            console.error("Duplicate Webhook Failed:", e.message);
        }
        console.log("\n--- Simulation Complete ---");
    });
}
// Wait for server to start if we were running it programmatically, 
// but here we assume user runs `npm start` separately or we use strict timing.
// For simplicity in this script, we just run immediately.

// Sunucunun programlı olarak başlatılmasını bekleyin, eğer programlı olarak çalıştırıyorsak,
// ancak burada kullanıcının `npm start` komutunu ayrı olarak çalıştırdığını veya sıkı zamanlama kullandığımızı varsayıyoruz.
// Bu scriptte basitlik için, hemen çalıştırıyoruz.
simulate();
