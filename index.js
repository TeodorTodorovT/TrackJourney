const express = require('express');
const handlebars = require('express-handlebars');

const app = express();



// Middleware to handle JSON data
app.use(express.json());

app.use(express.static('public'));

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// Routes

app.get('/', (req, res) => {
    res.render('home');
})

app.post('/logs', (req, res) => {
    const logs = req.body.logs;
    res.render('partials/logs', {logs});
});

// Server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
