# Swagger UI with Hot Reload Example

Simple example demonstrating usage of Swagger UI with hot reload enabled.

## About

The swagger UI is loaded in the `index.html` file, which loads the
`/swagger.json` file provided via the express application. Hot reload is enabled
such that updating the `swagger.json` definition in the `index.ts` file will
cause the browser to reload and display the latest version of the API documentation.

## Usage

From example directory

```shell
npm install
npm start
```

Visit [http://localhost:3200/api](http://localhost:3200/api) in a browser

Make changes to `index.ts` and see the browser reload automatically to display
the latest changes.

## Author

Maverik Minett  maverik.minett@gmail.com

## License

MIT 

## Copyright

© 2022 Maverik Minett

## License

MIT
