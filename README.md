# Exchange Rates

A web application which let you convert and displays several currency rates. Currently accepting:
- USD
- CAD
- SGD
- IDR
- MYR
- INR
- CHF
- JPY
- KRW
- GBP

### How to Use

1. Just simply type the number value you want to convert in the main panel of the app. 
2. If you want to add a currency to convert, click the `Add Currency` button at the bottom of the screen.
3. You can also switch/change the base currency by clicking the flag icon in the main panel.
4. If you want to swap the currency immediately, you can click at one of the flag icon in the currency list.
5. There is also `x` or clear button on the right of a currency panel if you want to remove the selected currency from the list.

### Deployment

This web application is automatically deployed, hosted using [Netlify](https://netlify.com) and can be accessed on [this link](https://exchange-rate.netlify.com/).

### API

Rates data are used from https://exchangeratesapi.io/.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributing
Please follow [this guide](https://github.com/riandy-dimas/exchange-rates/blob/master/CONTRIBUTING.md)
