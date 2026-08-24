import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import categoryRoutes from "./routes/categoryRoutes.js"
import articleRoutes from "./routes/articleRoutes.js"
import journalistRoutes from "./routes/journalistRoutes.js"

const app = express();
app.use(cors())
app.use(express.json())
app.use(logger)

const PORT = 3000;

app.use('/categories', categoryRoutes);
app.use('/articles', articleRoutes);
app.use('/journalists', journalistRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});