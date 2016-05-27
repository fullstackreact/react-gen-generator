'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // root files
    ['package.json',
      'webpack.config.js',
      'karma.conf.js',
      '.babelrc', '.env'
    ].forEach(function (filename) {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename),
        this.props
      );
    });
  },

  install: function () {
    this.installDependencies();
  }
});
