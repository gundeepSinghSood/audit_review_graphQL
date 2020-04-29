

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm run dev](#npm-run-dev)
- [npm packages used](#npm-packages-used)
  -[backend](#backend-packages)
  -[frontend](#frontend-packages)


## Folder Structure
```
  frontend/
    .next/
    components/
      molecules/
      templates/
    node_modules/
    pages/
    public/
    redux/
    styles/
    utility/
  graphql/
    resolver/
    schema/
  models/
  node_modules/
  package.json
  nodemon.json
  app.js
  README.md
  .gitignore
```


## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This will run backend as well as the front-end app

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


###  npm packages used

### backend-packages
```
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "concurrently": "^5.2.0",
    "express": "^4.17.1",
    "express-graphql": "^0.9.0",
    "graphql": "^15.0.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.9"
  },
  "devDependencies": {
    "nodemon": "^2.0.3"
  }
```

### frontend-packages

```
"dependencies": {
    "@material-ui/core": "^4.9.11",
    "@material-ui/icons": "^4.9.1",
    "js-cookie": "^2.2.1",
    "next": "9.3.5",
    "next-cookies": "^2.0.3",
    "next-redux-wrapper": "^6.0.0-rc.7",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-redux": "^7.2.0",
    "redux": "^4.0.5",
  }
```