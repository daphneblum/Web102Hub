# Web Development Project 5 - *Earth Status Dashboard*

Submitted by: **Daphne Blum**

This web app: **Earth Status Dashboard is an immersive, retro-futuristic telemetry console designed to track and visualize global volatility points in real time. Built with a high-fidelity aesthetic inspired by Y2K-dreamcore and  sci-fi command bridges, the application transforms raw geospatial event streams from the GDELT Cloud engine into an interactive monitoring experience. The system architecture routes data requests through an insulated serverless backend proxy, filtering out noise to isolate localized global events across four critical dimensions: Protests, Battles, Explosions/Remote Violence, and Health Crises. These signals are then synthesized into a unified layout featuring a fully interactive 3D planetary projection mesh with high-intensity glowing coordinate nodes, a responsive multi-parameter search log, and an automated system status ledger.**

Time spent: **18** hours spent in total

## Required Features


- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [X] **The app dashboard includes at least three summary statistics about the data** - The app dashboard tracks critical system telemetry metrics:
    - **Total Matrix Threat Log:** The total count of active filtered crisis reports matching current query parameters.
    - **High-Volatility Concentration Sector:** Calculates the specific country or region containing the highest frequency of logging events.
    - **Latest Live Intelligence Dispatch:** Displays the most recent headline text stream pulled from the satellite data layer.
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [X] Multiple filters can be applied simultaneously
- [X] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [X] The user can enter specific bounds for filter values

The following **additional** features are implemented:

## 🛠️ Additional Features & Architectural Highlights (Beyond Rubric)

* **Procedural Coordinate Mapping:** Developed a custom vector math conversion system to map raw latitude and longitude floats dynamically into true 3-dimensional spherical space vectors $(X, Y, Z)$ using standard spherical trigonometry.
* **Multi-Layered Planetary Mesh:** Constructed a three-tier Earth geometry stack consisting of an emissive ocean base mesh, transparent topography landmass texture overlay, and an independent glowing global coordinate grid line mesh.
* **Kinetic Physics Orbit Controls:** Integrated smooth damping physics and inertia tracking to simulate a weighted holographic globe. Implemented polar constraints ($minPolarAngle$ / $maxPolarAngle$ locked at $\pi / 2$) to enforce infinite horizontal longitudinal scanning while preventing jarring vertical camera inversion.
* **Un-Tone-Mapped Neon Luminescence:** Transformed raw coordinate nodes into active holographic targets by disabling traditional canvas exposure compression (`toneMapped={false}`) and forcing a high-intensity emissive factor of `3.5`, creating a genuine neon bloom effect.
* **Dynamic Local Search & Dropdown Synchronization:** Centralized active search states at the root component layer. Text queries and dropdown filters filter the master array simultaneously in real time, causing the 3D globe pins and the telemetry list view to update in perfect unison without jarring layout shifts.
* **Backend API Parameter Injection:** Engineered a Next.js serverless API routing proxy to safely hide private GDELT access tokens, intercepting raw global database streams and filtering out noisy data categories (e.g., corporate, political) before delivering a clean payload to the client interface.



## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='/public/assets/dashboard.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with Canva

## Notes
-To begin this project, I started with a mockup of the app in Figma:
<img src='/public/assets/database-mockup.png' alt='drafted mockup of UI made in Figma'>

-The primary struggle with this project was dealing with major API limitations and data restrictions. Initially, the project was supposed to use the standard, free GDELT API, but it couldn't provide the structured data needed for the dashboard. This forced a pivot to GDELT Cloud, which required an API key and meant creating a backend proxy using Next.js and Vercel to securely hide that key from the frontend. Even after switching, filtering and retrieving the correct categories proved difficult. While I successfully connected and retrieved the correct data, the final trade-off is that it requires making four separate API calls every time the data syncs, which quickly uses up a very limited number of API credits. For this reason, when not needed for live demos, mock data that is hard-coded in the mockEvents.js file is used instead of the live API data.

-This project is a growing collection of previous projects for CodePath WEB102. The goal is to eventually make this a completely interactive environment with users able to move between different stations aboard the ship and interact with each project. As such, there currently inaccessible components (expoplanet app and flashcard app) in the code that will be reimplemented at a later date.
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