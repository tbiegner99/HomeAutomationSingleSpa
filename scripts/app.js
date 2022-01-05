import { registerApplication, start } from 'single-spa';

const convertConfig = (config, customProps) => ({
  name: config.name,
  app: () => System.import(config.package),
  activeWhen: config.routes,
  customProps
});

const startApp = async () => {
  const appConfigs = await System.import('appConfig');
  const customProps = {
    apps: appConfigs
  };
  registerApplication({
    name: 'home',
    // eslint-disable-next-line import/no-unresolved
    app: () => System.import('home'),
    activeWhen: (location) => location.pathname === '/',
    customProps
  });

  appConfigs
    .filter((app) => Boolean(app.routes))
    .forEach((config) => {
      const registrationConfig = convertConfig(config, customProps);
      registerApplication(registrationConfig);
    });

  start();
};

startApp().then(() => {
  console.log('App Started');
});
