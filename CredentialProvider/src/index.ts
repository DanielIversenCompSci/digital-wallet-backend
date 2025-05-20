import express from 'express';
import { prescriptionRoutes } from './routes/prescription.route.js';

const PORT = 3001;
const app = express();

app.use(express.json());

// Mount routes
app.use('/', prescriptionRoutes);

// Run web server on PORT
app.listen(PORT, () => {
  console.log(`*Credential Provider Service*: Running on http://localhost:${PORT}`);
});