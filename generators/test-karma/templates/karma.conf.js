// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var webpackConfig = require('./config/webpack.config.test');

var package = require('./package.json');
var MODULE_ID = package.name;
var PORTLET_RELATIVE_URL = new RegExp(`/o/${MODULE_ID}/(.+)`, 'ig');
var SOURCE_ROOT = 'src/main/resources/META-INF/resources';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    middleware: ['liferay-template-url'],
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-sourcemap-loader'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      // require('karma-coverage-istanbul-reporter'),
      {
        'middleware:liferay-template-url': ['factory', function (config) {
          return function (req, res, next) {
            if (PORTLET_RELATIVE_URL.test(req.url)) {
              var url = req.url.replace(PORTLET_RELATIVE_URL, '/base/' + SOURCE_ROOT + '/$1');
              // console.log('Rewrite URL ' + req.url + ' to ' + url);
              res.writeHead(301, {Location: url});
              res.end();
              return;
            }
            next();
          };
        }]
      }
    ],
    preprocessors: {
      'src/**/*.ts': ['webpack', 'sourcemap']
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // coverageIstanbulReporter: {
    //   reports: [ 'html', 'lcovonly' ],
    //   fixWebpackSourcePaths: true
    // },
    files: [
      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      SOURCE_ROOT + '/js/polyfills.ts',
      'node_modules/zone.js/dist/long-stack-trace-zone.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      'node_modules/zone.js/dist/proxy.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      'node_modules/zone.js/dist/sync-test.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      'node_modules/zone.js/dist/jasmine-patch.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      'node_modules/zone.js/dist/async-test.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      'node_modules/zone.js/dist/fake-async-test.js', // 'TypeError: Cannot read property 'assertPresent' of undefined'
      SOURCE_ROOT + '/**/*.html',
      SOURCE_ROOT + '/**/*.spec.ts'
    ],
    // exclude: [
    //   './src/**/services/animations/*',
    //   './src/**/services/browser/*',
    // ],
    webpack: webpackConfig,
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
    // browsers: ['PhantomJS'],
    // singleRun: true
  });
};
