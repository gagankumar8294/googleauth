import express from 'express';
import ProductRouter from './src/products/product.routes.js';
import userRouter from './src/users/user.routes.js';
import { connectToMongo } from './config/mongo.js';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use('/api/users', userRouter);
server.use('/api/product', ProductRouter);



server.use('/', (req, res) => {
 res.send('Welcome to Home page')
})

// Connect to MongoDB first, then start server
connectToMongo().then(() => {
  server.listen(3200, () => {
    console.log('Server running on port http://localhost:3200');
  });
});

export default server;