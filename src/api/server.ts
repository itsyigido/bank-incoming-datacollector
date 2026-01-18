import express from 'express';
import router from './routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// Add root route for better UX
app.get('/', (req, res) => {
    res.send(`
        <h1>Bank Data Collector API</h1>
        <p>API is running.</p>
        <p>For the Dashboard, visit: <a href="http://localhost:5173">http://localhost:5173</a></p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
