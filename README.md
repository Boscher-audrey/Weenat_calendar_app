# Calendrier mensuel — React + TypeScript

Application de calendrier mensuel permettant de naviguer entre les mois et les années, et de gérer des événements par jour.

## Démarrage

```bash
npm install
npm run dev
```

L'application est ensuite accessible sur `http://localhost:5173`.

## Fonctionnalités

- Affichage d'un calendrier mensuel avec alignement correct des jours (semaine commençant le lundi)
- Navigation mois par mois et année par année
- Création d'un événement en cliquant sur un jour
- Affichage des événements directement dans la case du jour concerné, limité à 2 (voir la liste récapitulative)
- Suppression d'un événement
- Liste récapitulative des événements, triée chronologiquement

**Bonus (hors specs)** : persistance des événements via `localStorage` — les événements survivent à un rafraîchissement de la page.

## Stack

- **React 19** + **TypeScript**
- **Vite** — outillage de développement et build
- **ESLint** — linting
- Aucune dépendance externe pour la logique de dates ou la génération d'identifiants

## Choix techniques

**Pas de librairie de dates.** La logique calendaire est construite avec l'API `Date` native. Le projet ne nécessitait pas les fonctionnalités d'une librairie comme date-fns ou Day.js, et l'implémenter à la main permet de garder le bundle minimal.

**Format de date `YYYY-MM-DD` (ISO 8601).** Les événements sont rattachés à un jour via une chaîne au format ISO plutôt qu'un objet `Date`. Cela évite les ambiguïtés de fuseau horaire et d'heure et simplifie la comparaison. La chaîne est construite manuellement plutôt qu'avec `toISOString()`, qui convertit en UTC et peut décaler la date d'un jour.

**Identifiants avec `crypto.randomUUID()`.** API native du navigateur, sans dépendance. Évite les collisions d'identifiants après suppression, contrairement à une génération basée sur la longueur du tableau ou à un Math.random() qui ne garantit pas l'unicité.

**Pas de state dérivé.** Le nombre de jours du mois, le décalage du premier jour et les événements d'une case sont recalculés au rendu à partir de la date affichée, plutôt que stockés dans des states supplémentaires. Une seule source de vérité, pas de risque de désynchronisation.

**Lazy initial state** pour la lecture du `localStorage` au montage, afin de ne pas déclencher de rendu supplémentaire.

**Thème du projet** gardé de la création avec Vite

## Pistes d'amélioration (v2)

Ces points ont été identifiés mais volontairement laissés de côté pour rester dans le périmètre demandé :

- **Édition d'un événement** : modification du titre au clic sur un événement existant
- **Découpage en composants** : extraire le code depuis depuis `App.tsx`, qui centralise actuellement toute la logique et créer `CalendarHeader`, `CalendarGrid`, `DayCell` et `EventForm`
- **Événements enrichis** : horaire, description, catégorie/couleur
- **Groupement des événements par date** (via une `Map`) plutôt qu'un `filter` par case, si le volume d'événements devenait important
- **Validation du contenu du `localStorage`** avec un schéma (Zod) plutôt qu'un cast de type
- **Tests** : tests unitaires sur la logique calendaire (nombre de jours, décalage du premier jour, années bissextiles)
- **Accessibilité** : navigation clavier complète dans la grille, attributs ARIA sur les cases
- **Vue semaine / vue jour** en complément de la vue mensuelle
- **Design** qui matcherait ce qu'on trouve aujourd'hui dans des calendriers à événements tel que Google Calendar
- **Peupler les cases vides** en ajoutant les jours du mois précédent et du mois suivant
- **Navigation depuis la liste** : cliquer sur un événement de la liste positionne le calendrier sur le mois et l'année concernée
