const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const usersRoutes = require('./routes/users');
const defaultRoutes = require('./routes/default');

app.use(bodyParser.urlencoded());

app.use('/users', usersRoutes);
app.use(defaultRoutes);

app.listen(2000);