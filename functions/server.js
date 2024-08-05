import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

const app = express();

// Middleware to handle JSON data
app.use(express.json());


console.log(process.cwd());


app.use(express.static(path.join(path.resolve(), 'public')));
// console.log(path.join(path.resolve(), '../public'));


app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(path.resolve(), 'views'));

// Routes

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/logs', (req, res) => {
    const logs = req.body.logs;
    res.render('partials/logs', { logs });
});

export default app;
