const express = require('express');
const morgan = require('morgan');
const  cors = require('cors');

const app = express();
app.use(morgan('dev'));

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to ct466 application."});
});

require('./app/routers/user.router')(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

