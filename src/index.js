const Router = require('koa-router');
const database = require('./database');
const setupFixtures = require('../scripts/setup-fixtures');

const { initialize: initializeEmails } = require('./lib/emails');
const app = require('./app');
const config = require('./config');
const v1 = require('./v1');

const PORT = config.get('bind.port');
const HOST = config.get('bind.host');

(async () => {
  await database();
  await initializeEmails();
  await setupFixtures();

  const router = new Router();
  router.use('/1', v1.routes());

  app.use(router.routes());

  app.listen(PORT, HOST, () => {
    console.log(`Started on port //${HOST}:${PORT}`);
  });
})();