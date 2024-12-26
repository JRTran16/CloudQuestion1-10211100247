
const express = require('express');
const connectDB = require('./db/connect');
const { authRoutes, verifyToken} = require('./router/auth');
const cors = require('cors')
require('dotenv').config()

const {
    product, stock, order
} = require('./router')


const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/v1/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route' });
});
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/product', product)
app.use('/api/v1/stock', stock)
app.use('/api/v1/order', order)

const port = process.env.PORT || 3500;












const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`listening on ${port}`))
    } catch (error) {
        console.log(error);
        return
    }
}

start()