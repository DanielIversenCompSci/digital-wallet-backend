import express from 'express';
import { prescriptionVerifierRoutes } from './routes/perscriptionVerifier.route.js';

const PORT = 3003;
const app = express();

app.use(express.json());

// Mount routes
app.use('/', prescriptionVerifierRoutes);

// Run web server on PORT
app.listen(PORT, () => {
  console.log(`*Relying Party Service*: Running on http://localhost:${PORT}`);
});