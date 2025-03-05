import express from 'express';
import authRouter from './routes/auth.router';
import recipeRouter from './routes/recipe.router';
import morgan from 'morgan';
import cors from 'cors';

// Add this early in middleware section

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Routes
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipeRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;