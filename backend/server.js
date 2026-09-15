const app = require('./src/app');
const env = require('./src/config/env');

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Dermolife backend ishga tushdi: http://localhost:${env.port}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Ruxsat etilgan originlar: ${env.allowedOrigins.join(', ')}`);
});
