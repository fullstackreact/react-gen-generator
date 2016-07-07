'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

const tplCopy = function (name, to, props) {
  this.fs.copyTpl(
    this.templatePath(name),
    this.destinationPath(to || name),
    (props || this.props)
  );
};

const fileListCopy = function (files, dest) {
  const cpy = tplCopy.bind(this);
  files.forEach(filename => {
    cpy(filename, dest, this.props);
  });
};

const availableFeatures = [
  'redux'
];

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-react-gen') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'title',
      message: 'App name',
      default: this.appname
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author name',
      default: 'Ari Lerner'
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'Author email',
      default: 'ari@fullstack.io'
    }];

    // feature options
    availableFeatures.forEach(feature => this.option(feature));

    return this.prompt(prompts)
    .then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.features = [];
      availableFeatures.forEach(feature => {
        if (this.options[feature]) {
          this.features.push(feature);
        }
      });

    }.bind(this));
  },

  writing: function () {
    // root files
    var copyFiles = fileListCopy.bind(this);
    var baseFiles = ['package.json',
      'tests.webpack.js',
      'webpack.config.js',
      'karma.conf.js',
      '.babelrc',
      'src/',
      'config/'
    ];
    var dependencies = [
      'react', 'react-dom', 'classnames', 'font-awesome',
      'react-router', 'react-router-redux'
    ];
    var devDependencies = [
      'autoprefixer',
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-es2015-modules-umd',
      'babel-polyfill',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-react-hmre',
      'babel-preset-stage-0',
      'babel-register',
      'chai',
      'chai-enzyme',
      'cross-env',
      'css-loader',
      'cssnano',
      'dotenv',
      'enzyme',
      'expect',
      'file-loader',
      'hjs-webpack',
      'jasmine-core',
      'json-loader',
      'karma',
      'karma-chai',
      'karma-jasmine',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack',
      'mocha',
      'phantomjs-polyfill',
      'phantomjs-prebuilt',
      'postcss-loader',
      'precss',
      'react-addons-test-utils',
      'sinon',
      'style-loader',
      'url-loader',
      'webpack'
    ];

    var featureFiles = {
      redux: {
        'src/': {
          dependencies: ['react-redux',
            'redux-module-builder', 'redux-thunk'],
          devDependencies: ['redux-devtools',
          'redux-devtools-log-monitor', 'redux-devtools-dock-monitor'],
          files: ['features/redux/']
        }
      }
    };

    copyFiles(baseFiles);
    const cp = tplCopy.bind(this);
    cp("env", ".env", this.props);
    cp("gitignore", ".gitignore", this.props);

    this.features.forEach(featureKey => {
      this.log(`======> Enabling ` + chalk.blue(featureKey));
      const feat = featureFiles[featureKey];
      Object.keys(feat)
      .forEach(key => {
        const dest = key;
        const feature = feat[key];
        const files = feature.files;
        copyFiles(files, dest);

        if (feature.dependencies) {
          dependencies = dependencies.concat(feature.dependencies);
        }
        if (feature.devDependencies) {
          devDependencies =
            devDependencies.concat(feature.devDependencies);
        }
      });
    });

    this.npmInstall(dependencies, {save: true});
    this.npmInstall(devDependencies, {saveDev: true});
  },

  install: function () {
    this.installDependencies();
  }
});
