const express = require ('express');
const app = express();
const bodyParser = require ("body-parser");
const cors = require('cors')
const appRoutes = require('./routes/route');

require('dotenv').config()

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// App Routes
app.use('/', appRoutes)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`)); 