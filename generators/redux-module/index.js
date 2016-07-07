'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fs = require('fs');
var path = require('path');
var process = require('process')
var esprima = require('esprima');
var escodegen = require('escodegen');
var estraverse = require('estraverse');

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

const updateRootReducer = function(props) {
  const moduleName = props.moduleName;
  const rootReducerPath = path.join(process.cwd(), 'src/redux/rootReducer.js');
  const done = this.async();

  // don't do any traversing yet
  this.log(`Make sure you update your rootReducer with the property:

    ${chalk.blue(`${props.moduleName}: require('./modules/${props.moduleName}')`)}

    const modules = {
      ${props.moduleName}: require('./modules/${props.moduleName}')
    }
  `);

  return done();


  try {
    fs.stat(rootReducerPath, (err, stats) => {
      if (err) return done(err);

      let needsUpdate = false;
      if (stats.isFile()) {
        const data = fs.readFileSync(rootReducerPath, 'utf8');
        const AST = esprima.parse(data, {
          comment: true,
          sourceType: 'module'
        });
        estraverse.traverse(AST, {
          enter: (node, parent) => {
            if (node.type === 'VariableDeclarator' &&
                node.id.type === 'Identifier' &&
                node.id.name === 'modules') {

                  const newKV = {
                    'type': 'Property',
                    'key': {
                      'type': 'Identifier',
                      'name': this.props.moduleName
                    },
                    'computed': false,
                    'value': {
                      'type': 'Identifier',
                      'name': `require('./modules/${this.props.moduleName}')`
                    },
                    'kind': 'init',
                    'method': false,
                    'shorthand': false
                  }

                  const alreadyExists = false;
                  node.init.properties.forEach(prop => {
                    if (prop.type === 'Property' &&
                      prop.key.type === 'Identifier' &&
                      prop.key.name === this.props.moduleName) {
                        // Update this thing
                    }
                  })
                  // We found the const modules = {};
                  // let props = node.init.properties;
                  // props.push(newKV);
                  // needsUpdate = true;
                  // return node;
            }
          }
        });
        if (needsUpdate) {
          const finalCode = escodegen.generate(AST, {
            comment: true,
            format: {
              indent: {
                style: '  '
              }
            },
            comment: true
          });
          fs.writeFile(rootReducerPath, finalCode, done);
        } else {
          done();
        }
      }
    });
  } catch (e) {
    this.log(`${chalk.red('Cannot update rootReducer')}

Make sure you import this module into your root reducer.`);
    done('Cannot update rootReducer');
  }
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Create a redux module');
    const done = this.async();

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What do you want your module to be called?',
      default: this.appname
    }];

    return this.prompt(prompts)
    .then(function (props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: function () {
    // root files
    var copyFiles = fileListCopy.bind(this);
    const cp = tplCopy.bind(this);

    const modPath = `src/redux/modules/${this.props.moduleName}.js`
    cp('module-template.js', modPath, this.props);
    var dependencies = [
      'redux-module-builder'
    ];

    updateRootReducer.call(this, this.props);
    this.npmInstall(dependencies, {save: true});
  },


  // Currently not used

  install: function () {
    this.installDependencies();
  }
});
