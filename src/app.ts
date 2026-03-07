import express, { Application } from 'express';
import bookRoutes from './routes/book_routes';
import userRoutes from './routes/user_routes';
import loanRoutes from './routes/loan_routes';
import authRoutes from './routes/auth_routes';

const app: Application = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

export default app;