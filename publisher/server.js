import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './server/utils/logger';
import Route from './server/routes';

dotenv.config();

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use('/api/v1', Route);
app.use('*', (req, res) => res.status(404).json('Not Found'));
const PORT = process.env.PORT || '8000';
app.listen(PORT, () => {
  logger.info(`server is running at port ${PORT}`);
});
export default app;
