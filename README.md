# dailyOJ

An AngularJS Web Client for the OpenLaw API

Available at http://dailyoj.eu

OpenLaw API available at http://openlaw-api.eu

## Overview

This application allow browsing through the Official Journals of the European Union using the OpenLaw API

## Prerequisites

### Node.js and Tools

- Get [Node.js](http://nodejs.org/).
- Install the tool dependencies (`npm install`)

## Workings of the application

- The application filesystem layout structure is based on the [angular-seed] project.

## Development

The following docs describe how you can test and develop further this application.

### Installing dependencies

The application relies upon various node.js tools, such as Bower, Karma and Protractor.  You can
install these by running:

```
npm install
```

This will also run bower, which will download the dependencies needed.

Most of the scripts described below will run this automatically but it doesn't do any harm to run
it whenever you like.

### Running the app during development

- Run `npm start`
- Navigate your browser to `http://localhost:8000/app/index.html` to see the app running in your browser.

### Running unit tests

We recommend using [Jasmine](https://github.com/pivotal/jasmine) and [Karma](https://github.com/karma-runner/karma/) for your unit tests/specs, but you are free
to use whatever works for you.

- Start Karma with `npm test`
  - A browser will start and connect to the Karma server. Chrome is the default browser, others can
  be captured by loading the same url as the one in Chrome or by changing the `test/karma.conf.js`
  file.
- Karma will sit and watch your application and test JavaScript files. To run or re-run tests just
  change any of your these files.


### End to end testing

We recommend using [Jasmine](https://github.com/pivotal/jasmine) and [Protractor](https://github.com/angular/protractor) for end-to-end testing.

Requires a webserver that serves the application. See Running the app during development, above.

- Serve the application: run `npm start`.
- In a separate console run the end2end tests: `npm run protractor`. Protractor will execute the
  end2end test scripts against the web application itself.
  - The configuration is set up to run the tests on Chrome directly. If you want to run against
    other browsers then you must install the webDriver, `npm run update-webdriver`, and modify the
  configuration at `test/protractor-conf.js`.

## Application Directory Layout

    app/                --> all of the files to be used in production
      src/              --> the sources files for css and js resources
        css/            --> css files
          app.css       --> default stylesheet
        js/               --> javascript files
          app.js          --> the main application module
          controllers.js  --> application controllers
          directives.js   --> application directives
          filters.js      --> custom angular filters
          services.js     --> custom angular services
      fonts/            --> fonts files
      index.html        --> app layout file (the main html template file of the app)
      bower_components  --> 3rd party js libraries, including angular and jquery
    scripts/            --> handy scripts
    test/               --> test source files and libraries
      karma.conf.js        --> config file for running unit tests with Karma
      protractor-conf.js   --> config file for running e2e tests with Protractor
      e2e/
        scenarios.js       --> end-to-end specs
      unit/             --> unit level specs/tests

## Aknowledgment

README and project structure based on [angular-phonecat](https://github.com/angular/angular-phonecat)

## Contact

[Valentin Grouès](mailto:valentin.groues@gmail.com)
