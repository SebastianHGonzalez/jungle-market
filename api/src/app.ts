import express, { Handler } from 'express';

const app = express();

const helloWorld: Handler = (req, res) => {
  res.send('hello world');
};
app.get('/', helloWorld);

export default app;
