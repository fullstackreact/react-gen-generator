'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');

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

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('generator-react-gen') + ' generator!'
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

    return this.prompt(prompts)
    .then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // root files
    var copyFiles = fileListCopy.bind(this);
    var baseFiles = ['package.json',
      'webpack.config.js',
      'karma.conf.js',
      '.babelrc', '.env',
      'src/'
    ];

    var featureFiles = {
      redux: {
        'features/redux/': 'src/'
      }
    };

    copyFiles(baseFiles);

    Object.keys(featureFiles)
      .forEach(function (feature) {
        Object.keys(featureFiles[feature])
        .forEach(key => {
          const dest = featureFiles[feature][key];
          let files = glob.sync(key);
          copyFiles(files, dest);
        });
      });
  },

  install: function () {
    this.installDependencies();
  }
});
