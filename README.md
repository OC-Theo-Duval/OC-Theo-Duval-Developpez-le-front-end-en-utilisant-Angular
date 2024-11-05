# OlympicGamesStarter

**OlympicGamesStarter** is a student project designed to learn front-end development with **Angular**. This project focuses on data visualization, providing an interactive and engaging way to explore Olympic Games data.

The application features:
- A **home page** with a pie chart displaying the number of medals won by each country.
- General information about the Olympic Games.
- An interactive chart experience: users can click on a segment of the pie chart to view detailed, country-specific data in a dynamic line chart format.

This project showcases key Angular concepts, such as reusable components, routing, and service integration, all applied within a data-driven application.


## Description

The **OlympicGamesStarter** project is an Angular application that provides visual insights into Olympic Games data. This application allows users to explore and analyze data through interactive charts and well-organized pages.

## Features

- **Reusable Components**: The `components` folder contains reusable components, including various chart components for data visualization.
- **Pages for Routing**: The application structure is organized with different pages in the `pages` folder, each accessible through routing configured with Angular Router.
- **Core Services and Models**: The `core` folder includes business logic, such as services and data models. The `olympic.service.ts` manages data retrieval and manipulation.
- **Data Visualization**: Interactive charts are implemented to present Olympic data visually, providing users with an engaging and informative experience. `ngx-charts` to render the charts


## Development Server

Run `ng serve` to start a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to compile the project. The build artifacts will be stored in the `dist/` directory.

## Where to Start

1. **Explore the Structure**: Begin by examining the architecture of the project. Pay special attention to `app-routing.module.ts` and `olympic.service.ts` for routing and data management.
2. **Define Models**: Create TypeScript interfaces in the `models` folder based on the data structure in `olympic.json`. Replace any `any` types with specific interfaces to improve type safety and code readability.
3. **Implement Features**: Use the pre-built components and pages to integrate features like data visualization charts and ensure the application meets the project requirements.

Good luck!
