import app from './app';
import AppConfig from './config/app.config';
const port = AppConfig.PORT || 4000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
