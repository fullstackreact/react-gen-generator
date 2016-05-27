# Generate a starting point for your react app

The `react-gen` generator is a yeoman generator that creates an app using the same structure detailed in the the [blog post detailing cloning yelp with React](http://fullstackreact.com/articles/react-tutorial-cloning-yelp/).

Using this generator gives you a sane react structure with the following technologies:

* Webpack with hot module reloading (hjs-webpack)
* PostCSS and CSS modules, including autoprefixer, precss
* Global CSS loading
* React / ReactDOM
* react-router
* Nested routing with multiple views
* Testing with karma, mocha, chai
* React component testing helper enzyme
* Multiple deployment environments with dotenv configuration
* Babel with react, stage-0, and es2015
* font-awesome
* and more

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-gen using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-gen
```

Then generate your new project, answer some questions about your project, and go!

```bash
yo react-gen
```

## Workflow

Open your app in a text editor and start to work. To run the application, use the `npm start` script. This will boot a server with hot module reloading:

```bash
npm run start
```

To run the tests in our app, we can use the `npm run test` script. This sets up enzyme, boots the tests with karma, and executes them:

```bash
npm run test
```

As we're writing tests, sometimes it's just easier to run the tests as we update and edit files. The generator makes this easy using the `npm run test:watch` script. Run this command and then any changes to the files in our project will cause the tests to be run:

```bash
npm run test:watch
```

To build the app for distribution, we can use the `npm run build` command:

```bash
npm run build
```

## Contributing

```shell
git clone https://github.com/fullstackreact/redux-modules.git
cd redux-modules
npm install
npm start
```
___

# Fullstack React Book

<a href="https://fullstackreact.com">
<img align="right" src="https://github.com/fullstackreact/google-maps-react/raw/master/resources/readme/fullstack-react-hero-book.png" alt="Fullstack React Book" width="155" height="250" />
</a>

This generator was built alongside the blog post [React Tutorial: Cloning Yelp](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/).

This repo was written and is maintained by the [Fullstack React](https://fullstackreact.com) team. In the book, we cover many more projects like this. We walk through each line of code, explain why it's there and how it works.

<div style="clear:both"></div>

## License
 [MIT](/LICENSE)
