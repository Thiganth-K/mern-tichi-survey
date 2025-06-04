import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import limiter from './middleware/rateLimiter.js';
import { submitSurvey, getSurveys } from './controllers/controllers.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory

if (process.env.NODE_ENV !== 'production') {
app.use(cors(
    {origin: "http://localhost:5173", // Allow requests from this origin}
}));
}
app.use(express.json());
app.use(limiter); // Apply rate limiting middleware

if(process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static files from public directory
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html")); // Serve index.html for all other routes
});
}
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

