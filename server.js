import express from 'express';
import ProductRouter from './src/products/product.routes.js';
import './config/mongo.js';

const server = express();



server.use('/api/product', ProductRouter);

server.use('/', (req, res) => {
 res.send('Welcome to Home page')
})

server.listen(3200, () => {
    console.log('Server running on port http://localhost:3200');
})

export default server;