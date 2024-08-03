import express from 'express';
import handlebars from 'express-handlebars';
const serverless = require('serverless-http');

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


module.exports.handler = serverless(app);
