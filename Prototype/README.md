# Noah's Ark Nursery 
```
  Based on Atomic by Jaywing
                                 \         .  ./
                             \      .:";'.:.."   /
                                 (M^^.^~~:.'").
                           -   (/  .    . . \ \)  -
    O                         ((| :. ~ ^  :. .|))
   |\\                     -   (\- |  \ /  |  /)  -
   |  T                         -\  \     /  /-
  / \[_]..........................\  \   /  /
  
  F R O N T   E N D   S T A R T E R   K I T
```
## Features and Tools Used

* **CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps, [scss-lint](https://github.com/sasstools/gulp-sass-lint)
* **JavaScript** | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/)
* **HTML** | Razor templates with [gulp-razor-tmpl](https://www.npmjs.com/package/gulp-razor-tmpl). Validation and linting with [gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint)
* **Images** | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)
* **Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
* **Live Updating** | [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* **Production Builds** | JS and CSS are [uglified](https://github.com/terinjokes/gulp-uglify) and [minified](http://cssnano.co/), [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport), local production [Express](http://expressjs.com/) server for testing builds.
* **JS Testing** | [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), Example [Travis CI](https://travis-ci.org/) integration
* **Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)

## Usage
Make sure Node installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions. 

This has been tested on Node `0.12.x` - `5.9.0`, and should work on newer versions as well. [File an issue](https://github.com/vigetlabs/gulp-starter/issues) if it doesn't!

#### Install Dependencies
```bash
npm install
```

#### Run development tasks:
```
npm start
```
Aliases: `npm run gulp`, `npm run development`

This is where the magic happens. The perfect front-end workflow. This runs the default gulp task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

Why run this as an npm script? NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

#### Run in tests in watch mode:
```bash
npm run test:watch
```

#### Run tests once:
```bash
npm run test
```

#### Build production files:
```bash
npm run production
```

### Running the Demo
By default, the files in `src` are pretty minimal. If you're just exploring and would like to play with the [demo](http://vigetlabs.github.io/gulp-starter/) files, the files available in `extras/demo`. Just replace `src` and `config.json` with the ones in `extras/demo`, or simply check out the `demo` branch.

```
git checkout demo
npm start
```

### Starting a fresh project
If you plan on using this to start a new project, be sure and clear out the `git` data start a fresh history:

```bash
rm -rf .git && git init
git commit -m "Initialized with Gulp Starter"
```

## Configuration
Directory and top level settings are convienently exposed in `gulpfile.js/config.json`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile.js/tasks`.

### Start compiling, serving, and watching files
```
npm run gulp
```

(or `npm run development`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile.js/tasks/default.js`.

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

To run any other existing task, simply add the task name after the `gulp` command. Example:

```bash
npm run gulp production
```

## Asset Task Details
A `README.md` with details about each asset task are available in their respective folders in the `src` directory:

- [JavaScript](src/js)
- [Stylesheets](src/scss)
- [HTML](src/html)
- [Fonts](src/fonts)
- [Images](src/img)
- [Icon Font](src/icons#iconfont-task)
- [SVG Sprite](src/icons#svg-sprite-task)
- [Static Files (favicons, app icons, etc.)](src/static)

## Additional Task Details

### Build production-ready files
```
npm run production
```

This will compile revisioned (if enabled) and compressed files to `./public`. To build production files and preview them locally, run

```
npm run demo
```

This will start a static server that serves your production files to http://localhost:5000. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

### Run JavaScript Tests
```
npm run test
```
Test files located in `__tests__` folders are picked up and run using
[Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/). The test script right now first compiles a production build, and then, if successful runs Karma. This is nice when using something like [Travis CI](https://travis-ci.org/vigetlabs/gulp-starter) in that if an error occurs during the build step, Travis alerts me that it failed. To pass, the files have to compile properly AND pass the JS tests.

### Deploy to gh-pages
```
npm run deploy
```
This task compiles production code and then uses [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages) to push the contents of your `dest.root` to a `gh-pages` (or other specified) branch, viewable at http://[your-username].github.io/[your-repo-name]. Be sure to update the `homepage` property in your `package.json`.

GitHub Pages isn't the most robust of hosting solutions (you'll eventually run into relative path issues), but it's a great place to quickly share in-progress work, and you get it for free.

[Surge.sh](http://surge.sh/) might be a good alternative for production-ready static hosting to check out, and is just as easy to deploy to. Where ever you're deploying to, all you need to do is `npm run gulp production` and transfer the contents of the `public` folder to your server however you see fit.
