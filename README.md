Olympic Games Dashboard
## Description
This is a web application developed for the TéléSport TV channel. It provides users with an interactive dashboard to view information about previous Olympic Games, including the number of medals by country and other statistical data. The application is optimized to work on both computers and mobile devices.

## Technologies
Angular (version ^18.2.8)
RxJS (version ~7.8.0)
Angular Material (version ^18.2.8)
SCSS for styling
TypeScript (version ~5.4.2)
Requirements
Node.js version 14.x or higher
npm version 6.x or higher
Angular CLI version ^18.2.8

Important Note
Please Note: The Angular versions specified in package.json may be incorrect or pre-release versions. As of October 2023, the latest stable version of Angular is 16.x. If you encounter installation or compatibility issues, please check and update the dependency versions to the current ones.

## Installation
Fork the repository:

Navigate to the original repository at https://github.com/natalliaSkiba/Developpez-le-front-end-en-utilisant-Angular.
Click the "Fork" button in the top-right corner to create a copy of the repository in your own GitHub account.
Clone your forked repository:

git clone https://github.com/your_username/Developpez-le-front-end-en-utilisant-Angular.git
Navigate to the project directory:

cd Developpez-le-front-end-en-utilisant-Angular
Install Angular CLI globally (if not already installed):

npm install -g @angular/cli
Install project dependencies:

npm install
If you encounter errors during dependency installation, check the versions of Angular and other packages in package.json and update them to compatible versions.

Running the Application
Development Mode
Start the development server:

ng serve
The application will be available at http://localhost:4200/.

## Production Build
To build an optimized production version of the application, run:

ng build --configuration production
The built files will be located in the directory specified in the angular.json file under the "outputPath" parameter. By default, this is dist/olympic-games-starter.

## Project Structure
Services: Used to perform HTTP requests to the API.
RxJS and Observables: Used for managing asynchronous operations and data streams.
Unsubscribing from Observables: All subscriptions are properly unsubscribed in ngOnDestroy to prevent memory leaks.
Code Typing: All code is strictly typed using TypeScript; the any type is not used.
Best Practices
Code Organization: The project is organized according to Angular recommendations to enhance readability and maintainability.
Styling: SCSS is used for efficient and organized component styling.
Responsive Design: The application is optimized to work on various devices, including mobile phones and computers.
Design and Mockups
The application's design is based on mockups provided by UX designer Omar. All user interfaces adhere to these specifications.

Notes
Tool Versions: Ensure that the versions of Node.js, npm, and Angular CLI match the project's requirements.
Dependency Issues: If you encounter problems during installation or running the application, check the package.json and angular.json files for incompatible versions.

## Contact
If you have any questions or suggestions, please contact us:
skiba.natallia77@gmail.com