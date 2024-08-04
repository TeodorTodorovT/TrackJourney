import express from 'express';
import handlebars from 'express-handlebars';


const app = express();

// Middleware to handle JSON data
app.use(express.json());


console.log(process.cwd());


app.use(express.static('public'));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// Routes

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/logs', (req, res) => {
    const logs = req.body.logs;
    res.render('partials/logs', { logs });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

