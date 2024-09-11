# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Features

- **Country Search:** Users can search for countries by name.
- **Random Countries Widget:** Displays 3 random countries with their next upcoming holiday.
- **Holiday List:** Shows the holidays for a selected country with year switching (from 2020 to 2030).
- **Routing:** Navigation between the home page and individual country details pages.

## Architecture Overview

- **Angular Framework:** This project uses Angular for its core structure, routing, and form handling.
- **Angular Material UI:** For user interface components and responsive design.
- **RxJS:** For handling asynchronous operations like API calls and reactive programming.
- **Angular Forms:** For handling input fields in a reactive way (country search).
- **Angular Router:** For page navigation between home and country pages.
- **REST API Integration:** The application fetches country and holiday data using HTTP requests to the Nager.Date API.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- **Angular CLI** (version 12.x or higher)

##Setup environment variables

BASE_API = https://date.nager.at/api/v3

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
