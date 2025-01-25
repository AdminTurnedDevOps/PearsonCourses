React-Double Scrollbar
======================
Adds a horizontal scrollbar to the top of an element.

## Usage
Example in a React.Component render method:

```javascript
render() {
    return (
      <div>
        <DoubleScrollbar>
          <table>...</table>
        </DoubleScrollbar>
      </div>
    );
  }
```

## Installation

The easiest way to use React-Double Scrollbar is to install it from NPM and include it in your own build.

```javascript
npm install react-double-scrollbar --save
```

You can also use the standalone build by including `dist/DoubleScrollbar.js` in your page.

# License

MIT

# Change log
v0.0.15
- Recalculate the width of the children in componentDidUpdate and if the width has changed update the width of the top scrollbar div.

v0.0.11
- Add onresize to update the scrollbar when the window size changes

v0.0.10
- Dependency fix, added peerDependency and allow for react 0.14.7 or newer

v0.0.9
- Added tests and documentation

# Contributing

All help is appreciated. To contribute please create a branch, make changes, add or update tests then create a pull request.

# Development

Clone repo then run

`npm install`

To build run

`npm run build`

To test

`npm test`

Test in watch mode

`npm test -- --watch`

# To create and publish a new version

Make sure to update version in package.json

To create a new tag run

`git tag <new version>`

`git push origin --tags`

To publish to npm

`npm publish`
