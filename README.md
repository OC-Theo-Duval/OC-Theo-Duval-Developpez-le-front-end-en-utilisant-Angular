# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!


# Application de Visualisation des Données Olympiques
Cette application web, développée avec Angular, permet de visualiser les données des Jeux Olympiques, y compris la participation, le nombre de médailles, et les statistiques des athlètes pour différents pays. L'application propose également un graphique linéaire dynamique pour afficher l'évolution des médailles au fil du temps grâce à la bibliothèque ngx-charts.

## Table des matières
Fonctionnalités
Technologies utilisées
Utilisation

### Fonctionnalités
Graphiques dynamiques : Visualisation du nombre de médailles remportées par un pays via un graphique de type pie.
Design responsive : L'application est entièrement responsive, s'adaptant aux différentes tailles d'écran grâce à l'utilisation des media queries.
Détails par pays : Consultez des informations détaillées sur la participation olympique de chaque pays, incluant le total des médailles et des athlètes, présentées à travers un graphique linéaire retraçant chaque édition des Jeux olympiques.
Routing dynamique : Navigation entre les données des différents pays grâce à des routes dynamiques (/country/:name).
Gestion des erreurs : Une page 404 personnalisée est affichée pour les routes non définies.

### Technologies utilisées
Angular : Framework web utilisé pour construire cette application SPA (Single Page Application).
RxJS : Utilisé pour la programmation réactive et la gestion des flux de données asynchrones.
Ngx-Charts : Bibliothèque de graphiques utilisée pour créer des graphiques dynamiques.
Font Awesome : Utilisé pour les icônes dans la navigation et les éléments de l'interface utilisateur.

### Utilisation
Accédez à la page d'accueil (/) pour voir la liste des pays participants.
Cliquez sur un pays pour voir ses détails, y compris :
Le nombre de participations aux Jeux Olympiques.
Le nombre total de médailles.
Le nombre total d'athlètes.
Le graphique linéaire affiche la progression des médailles au fil des années.
Vous pouvez revenir à la page d'accueil en utilisant le bouton de retour ou les liens de navigation.
