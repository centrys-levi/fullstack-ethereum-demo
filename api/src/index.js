import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import SmartContractsService from '../../smartContracts/smartContractsService';

const app = express();
app.server = http.createServer(app);

const smartContractsService = new SmartContractsService(config.blockchainUrl);

// logger
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400
}));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ smartContractsService }));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
