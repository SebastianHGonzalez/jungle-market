import app from './app';

const port = 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to %d!', port);
});
