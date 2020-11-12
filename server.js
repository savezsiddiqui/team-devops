const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

//Connect to Database
connectDB();

//Initialize middlewares
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set the public folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server stared at port ${PORT}`));