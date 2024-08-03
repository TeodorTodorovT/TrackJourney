import express from 'express';
import handlebars from 'express-handlebars';
import serverless from 'serverless-http';
import path from 'path';


const app = express();

// Middleware to handle JSON data
app.use(express.json());

console.log(__dirname);


app.use(express.static(path.join(__dirname, '../../../../views')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../../../../views'));

// Routes

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/logs', (req, res) => {
    const logs = req.body.logs;
    res.render('partials/logs', { logs });
});

// Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

export const handler = serverless(app);
