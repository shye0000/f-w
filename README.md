Fondations front
================

### [ Container Docker ]
**Before deploy the project on your PC, make sure that the 3 following ports are available:**

**8666, 6866, 6686**

Project dev deployment :
```
docker-compose build
docker-compose up -d
docker exec -it fondations_front_dev bash
```
For ansible :
```
// todo
// docker-compose build --build-arg GITLAB_IP=82.225.240.34 react
// docker-compose up -d
// docker exec -it fondations_front_dev bash
```

### [ Manuelly install project dependencies ]

```
npm install

npm update
// update all dependencies to the lastest compatible version
```

### [ Start development environment ]

```
npm run dev
```
**Project url:                                localhost:8666**

**webpack-bundle-analyzer interface url:      localhost:6866**

**webpack-dev-server url:                     localhost:6686**


### [ Test production build locally ]

```
npm run build-test-prod
// Build the project in mode production with dev configurations
// Donnot forget to check the webpack-bundle-analyzer interface to make sure that all chunks are built normally (dependencies, bundle size ...)

npm run start
// Start node server in production mode
```
**For testing the project with other devices in the same local network (ex: ipad, mac, others pc ...)**

> Change the domain name of the "apiEntryPoint" in "dev.js" by the IP address of your PC.
    ex: http://192.168.199.95:8088.

> Run "npm run build-test-prod" and "npm run start".

> For running the project on your testing device, enter "your_ip:project_port" in the browser.
    ex: http://192.168.199.95:8666

### [ i18n ]

```
npm run i18n-add-locale // add languages
npm run i18n-extract // extract translation keys in project
npm run i18n-compile // compile translation json files on js files
```

**For more configurations and details about i18n, check the file "package.json".**

[jsLingui official docs](https://lingui.js.org)


### [ Run tests ]

```
npm test
npm run update-snapshot (run test with update snapshots)
npm run coverage (run test and generate test coverage report)
npm run test:watch
```

### [ Versionning project ]

```
npm run version-major
npm run version-minor
npm run version-patch
```

### [ Build project with production environment ]

```
npm run build-prod
npm run build-preprod
npm run build-demo
npm run build-test-prod
```

### [ Run node server for production ]

```
npm run start
```

### [ Generate documentations ]

```
npm run doc

// then open the index.html in your browser
google-chrome ./docs/index.html
```

### [ JavaScript inspections configurations ]

**First disable the default js inspections in PhpStorm:**

> File --> settings --> Inspections --> Javascript --> Uncheck all

**Then enable ESLint code quality tool:**

> File --> settings --> Languages & Frameworks --> JavaScript --> Code Quality Tools --> ESLint --> Enable

**For running ESLint check on JS files manually:**

```
./node_modules/.bin/eslint path/to/your/file.js

./node_modules/.bin/eslint ./src/**/*.js
```
([Learn more about ESLint command line interface](https://eslint.org/docs/user-guide/command-line-interface))

**For more details of current ESLint configurations, check the file ".eslintrc.json".**

Credits
-------

[WEBCENTRIC](http://wcentric.com)

If you get bored
----------------
Type jtsjts...