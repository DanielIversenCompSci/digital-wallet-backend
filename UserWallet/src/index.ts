import express from 'express';
import { prescriptionManagerRoutes } from './routes/prescriptionManager.route.js';

const PORT = 3002;
const app = express();

app.use(express.json());

// Mount routes
app.use('/', prescriptionManagerRoutes);

// Run web server on PORT
app.listen(PORT, () => {
  console.log(`*User Wallet Service*: Running on http://localhost:${PORT}`);
});