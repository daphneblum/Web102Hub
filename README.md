# Web Development Project 2 - *Intergalactic Interpreter Trainer - Flashcard App*

Submitted by: **Daphne Blum**

This web app: **An interactive flashcard application set aboard a futuristic spaceship bridge. Users can select a deck, flip cards to reveal answers, view accompanying images, and navigate through a randomized set of flashcards. The experience is presented through a custom sci-fi interface built with React Three Fiber and a fully integrated 3D environment.**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x] Title of card set is displayed 
  - [x] A short description of the card set is displayed 
  - [x] A list of card pairs is created
  - [x] The total number of cards in the set is displayed 
  - [x] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [x] **A single card at a time is displayed**
  - [x] Only one half of the information pair is displayed at a time
- [x] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x] Clicking on a card flips it over, showing the back with corresponding information 
  - [x] Clicking on a flipped card again flips it back, showing the front
- [x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [x] Cards contain images in addition to or in place of text
  - [x] Some or all cards have images in place of or in addition to text
- [x] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [x]  Fully integrated 3D spaceship bridge environment using React Three Fiber
* [x]  Custom holographic card design with glow effects and sci-fi styling
* [x]  Quiz progress tracker displaying current card number
* [x]  Correct/Incorrect score tracking
* [x]  Navigation system for returning to deck selection


## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='public/assets/flashcards.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with   
Canva

## Notes

One of the biggest challenges was integrating a traditional flashcard application into a fully interactive 3D environment using React Three Fiber. Positioning the interface within the spaceship bridge, balancing scene lighting, and creating a sci-fi aesthetic required significant experimentation with CSS effects, camera placement, and Three.js rendering. Another challenge was ensuring that card interactions, randomized card selection, and score tracking continued to work correctly while layering React UI components over a 3D scene.


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