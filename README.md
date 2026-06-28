# Web Development Project 4 - *Stellar Cartography*

Submitted by: **Daphne Blum**

This web app: **Stellar Cartography is an interactive space exploration experience inspired by StumbleUpon. Each click retrieves a random confirmed exoplanet from NASA's Exoplanet Archive and procedurally generates a unique 3D visualization based on its scientific properties. Users can browse the galaxy, compare planetary characteristics, and customize future discoveries through an interactive filtering system.**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [X] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [X] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [X] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [X] **Clicking on a displayed value for one attribute adds it to a displayed ban **list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [X] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  -  [X] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_


The following **optional** features are implemented:

- [X] Multiple types of attributes are clickable and can be added to the ban list
- [X] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [X] Procedurally generated animated 3D planets created from real exoplanet data rather than static images.
* [X] Custom GLSL shaders for gas giants.
* [X] Dynamic planet classification that changes the visualization based on planetary characteristics (rocky vs. gas giant).
* [X] Animated starfield background within the display viewport.
* [X] Custom sci-fi interface inspired by Star Trek LCARS aesthetics and retro-futuristic design.


## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='/public/assets/stumbleupon.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with Canva

## Notes
-The NASA Exoplanet Archive does not provide images for confirmed exoplanets. Rather than substituting an unrelated image dataset, this application procedurally generates a unique 3D planet directly from the JSON data returned by the API. Scientific attributes such as planetary radius and equilibrium temperature are used to determine the planet's classification, scale, color palette, atmospheric effects, and surface appearance. As a result, every API response produces a unique visualization that is derived from the returned data instead of relying on pre-rendered images.
-- This project is built within a larger evolving codebase that also contains a previously submitted flashcard application (Web Development Project 2/3). The flashcard station is currently not accessible from this project's interface — navigation between stations is a planned feature that will be implemented after submission. The shared codebase approach was chosen to avoid re-uploading a large 3D model file (127MB, stored via Git LFS) across multiple repositories.
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