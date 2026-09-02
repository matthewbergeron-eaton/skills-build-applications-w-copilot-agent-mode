import 'dotenv/config';
import { connectDatabase } from './config/database.js';
import { app, getApiBaseUrl } from './app.js';

const port = 8000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Octofit Tracker API listening at ${getApiBaseUrl()}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });
