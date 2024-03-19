import express from 'express';
import cors from 'cors';
import { weatherRoute } from './routes/weather.js';

const app = express();

app.use(cors());
app.use('/api', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
