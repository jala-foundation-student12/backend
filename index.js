'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api/users', require('./routes/user'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/socialNet', require('./routes/social_networks'));
app.use('/api/friendship', require('./routes/friendship'));
app.use('/api/search', require('./routes/search'));

app.listen(process.env.PORT, ()=>{
    console.log('Server on run ', process.env.PORT);
});
