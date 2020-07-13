import fs from 'fs';
import express from 'express';
import jsonGraphqlExpress from 'json-graphql-server';

const PORT = 3000;
const app = express();
const data = JSON.parse(fs.readFileSync('db.json'));
app.use('/graphql', jsonGraphqlExpress(data));
app.listen(PORT);
