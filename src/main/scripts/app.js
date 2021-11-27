import { registerApplication, start } from 'single-spa';

const loadApplications = () => [
  {
    name: 'security',
    title: 'Security',
    package: 'security',
    routes: null
  },
  {
    name: 'indorClimate',
    title: 'Indoor Climate',
    package: 'indorClimate',
    routes: null
  },
  {
    name: 'weather',
    title: 'Weather',
    package: 'weather',
    routes: null
  },
  {
    name: 'tv',
    title: 'TV',
    package: 'tv',
    routes: null
  },
  {
    name: 'todo',
    title: 'To Do',
    package: 'todo',
    routes: null
  },
  {
    name: 'garden',
    title: 'Garden',
    package: 'garden',
    routes: null
  },
  {
    name: 'music',
    title: 'Music',
    package: 'music',
    routes: null
  },
  {
    name: 'kareoke',
    title: 'Kareoke',
    package: 'kareoke',
    routes: '/kareoke'
  }
];

const convertConfig = (config, customProps) => ({
  name: config.name,
  app: () => System.import(config.package),
  activeWhen: config.routes,
  customProps
});

const startApp = async () => {
  const appConfigs = await loadApplications();
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
