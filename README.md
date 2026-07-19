# Web Development Project 7 - *Crew Creator*

Submitted by: **Daphne Blum**

This web app: **This web app lets you build out a project team by assigning members to self-defined roles and giving each of them a checklist of role-specific tasks. Roles and their task pools are entirely user-defined on a dedicated setup page — nothing is hardcoded — so the same app works whether you're organizing a research team, an engineering sprint, or an away team. The crew roster's summary statistics and card colors update live as tasks get checked off, giving an at-a-glance read on who's finished and who's still working.**

Time spent: **10** hours spent in total

## Required Features

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate's attributes by clicking on one of several values

- [x] **The web app includes a summary page of all the user's added crewmates**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top

- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page

- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
  
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - e.g., a Dungeons and Dragons class or a development team role (project manager, product owner, etc.)
  - User can choose a `category` option to describe their crewmate before any attributes are specified
  - Based on the category value, users are allowed to access only a subset of the possible attributes
- [x] A section of the summary page displays summary statistics about a user's crew on their crew page
  - e.g., the percent of members with a certain attribute
- [x] The summary page displays a custom "success" metric about a user's crew which changes the look of the crewmate list
  - e.g., a pirate crew's predicted success at commandeering a new galley

The following **additional** features are implemented:

## The following **additional** features are implemented:

* [x] Categories double as roles with their own dedicated task pools, set up on a separate "Manage Roles & Tasks" page rather than hardcoded in the app
* [x] Tasks assigned to a crewmate can be checked off as done individually, not just assigned/unassigned
* [x] Each crewmate card's border color interpolates from cool blue to warm pink based on *that member's own* task completion rate, so it's possible to see at a glance who's finished and who isn't, in addition to the crew-wide progress bar
* [x] A progress bar tracks total task completion across the whole crew alongside the summary statistics
* [x] Built as an integrated station inside a larger React Three Fiber portfolio project (Enterprise Bridge), matching its existing LCARS/hologram visual system rather than as a standalone app




## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='/public/assets/crewcreator.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with Canva

## Notes
-Due to time constraints, this project is much more straight-forward and less ambitious than my previous projects.


## License

    Copyright 2026 Daphne Blum

    "U.S.S. Enterprise A New Bridge" (https://skfb.ly/pBHEs) by Cpt.Kirk is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
