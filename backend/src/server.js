import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import limiter from './middleware/rateLimiter.js';
import { submitSurvey, getSurveys } from './controllers/controllers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(limiter); // Apply rate limiting middleware

connectDB().then(() => {
    app.post('/api/survey', submitSurvey); // Endpoint to submit or update survey
    app.get('/api/surveys', getSurveys); // Endpoint to get all surveys (admin/testing)
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);          
    });
    console.log('working successfully');
}).catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
});

