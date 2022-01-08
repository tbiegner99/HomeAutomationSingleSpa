import { registerApplication, start } from 'single-spa';

const matchRoutes = (config) => {
  if (Array.isArray(config.routes)) {
    return config.routes;
  }
  const { mode, routes } = config.routes;
  if (mode === 'exact') {
    return (location) => routes.some((route) => location.pathname === route);
  }
  return routes;
};

const convertConfig = (config, customProps) => ({
  name: config.name,
  app: () => System.import(config.package),
  activeWhen: matchRoutes(config),
  customProps
});

const startApp = async () => {
  const configFile = await System.import('appConfig');
  const appConfigs = configFile.default;
  const byPriorityDesc = (app1, app2) => {
    if (app1.priority < app2.priority) {
      return 1;
    } else if (app1.priority > app2.priority) {
      return -1;
    } else if (app1.title < app2.title) {
      return -1;
    }
    return 1;
  };
  const apps = appConfigs.filter((app) => app.priority > 0).sort(byPriorityDesc);
  console.log(apps);
  const customProps = { apps };
  // registerApplication({
  //   name: 'home',
  //   // eslint-disable-next-line import/no-unresolved
  //   app: () => System.import('home'),
  //   activeWhen: (location) => location.pathname === '/',
  //   customProps
  // });

  appConfigs
    .filter((app) => Boolean(app.routes))
    .forEach((config) => {
      const registrationConfig = convertConfig(config, customProps);
      registerApplication(registrationConfig);
    });

  start();
};

startApp()
  .then(() => {
    console.log('App Started');
  })
  .catch((err) => console.log(err));
