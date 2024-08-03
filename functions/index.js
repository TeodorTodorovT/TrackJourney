import express from 'express';
import handlebars from 'express-handlebars';
import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middleware to handle JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/logs', (req, res) => {
    const logs = req.body.logs;
    res.render('partials/logs', { logs });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export const handler = serverless(app);
