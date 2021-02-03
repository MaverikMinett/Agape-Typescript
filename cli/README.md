# @agape/cli

The agape cli

*Alpha*

## Synopsis

```
ag init
ag new <project name>
```

## Description

Command line interface for managing agape enabled projects


## Commands

- `config`

Configure the agape cli. Set global author and license meta-data 
to use in projects.

- `new`

Create a new project in the current sandbox

- `init`

Create a new sandbox project in the current directory.

- `build`

Build the active project into the 'build' directory.

- `pack`

Package the active project into the 'dist' directory.

- `release`

Release the package by publishing it to a repository
or copying it to a local folder.

- `install`

Install the package


## Getting Started


Create a sandbox. 
```
mkdir my-application-suite
ag init
```


Create a project within the sandbox.
```
cd my-application-suite
ag new api
```


## Project Types

- django

- angular

- typescript

- node


## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2020-2021 Maverik Minett


## License

MIT
