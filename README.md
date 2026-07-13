# Web Development Project 6 - *Starseed Forecast*

Submitted by: **Daphne Blum**

This web app: **This web app displays real-time astronomical and astrological data in a retrofuturistic dashboard inspired by late 90s and early 2000s sci-fi interfaces. Users can browse current planetary positions, filter planets by zodiac element and retrograde status, view detailed information for each celestial body, and explore visualizations including a retrograde timeline and planetary aspect radar. This data is then used to generate a dreamy, sci-fi-style daily horoscope inspired by Summer Wiley's Starseed Weather Service skits on TikTok.**

Time spent: **30** hours spent in total

## Required Features

- [x] **Clicking on an item in the list view displays more details about it**
  - Planet entries in the directory navigate to a dedicated detail page
  - Detail pages display additional astronomical and astrological information
  - Navigation remains consistent across dashboard and detail views

- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - Each planet has its own unique route (for example: `/planet/venus`)

- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - Retrograde Timeline visualization
  - Planetary Aspect Radar visualization

The following **optional** features are implemented:

- [x] The site's customized dashboard contains additional information explaining the current celestial conditions
- [x] The site allows users to toggle between different data visualizations
  - The Aspect Radar allows users to toggle between scope view and list view

The following **additional** features are implemented:

## 🛠️ Additional Features & Architectural Highlights (Beyond Rubric)

- [x] AI-generated astrological forecasts powered by Google Gemini
- [x] Forecasts generated from live planetary positions rather than static text
- [x] Search planets by name or zodiac sign
- [x] Filter by zodiac element
- [x] Filter to display only retrograde planets
- [x] Minimum degree slider filter
- [x] Planet glyphs displayed alongside each celestial body
- [x] Color-coded retrograde/direct status indicators
- [x] Scrolling broadcast ticker displaying dynamic messages




## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='/public/assets/dashboard.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with Kap

## Notes

-The biggest challenge in this project was balancing functionality with visual design. I wanted the dashboard to feel like an interface from a retrofuturistic spacecraft rather than a traditional analytics dashboard while still presenting real astronomical data in a usable way. Designing reusable React components, organizing the layout, and refining the visual styling required multiple iterations as the project grew beyond the original assignment scope.

-This project is still a work in progress. There are plans to add further visualizations to the detail pages as well as improve readability.

-This project was a completely new dashboard, different from Project 5. Because of this, I ensured it met all the rubric requirements for project 5 as well as project 6. 

-Forecast was inspired by Summer Wiley on TikTok:
<video src="(https://www.tiktok.com/t/ZP8GGqyFC/)" width="320" height="240" controls></video>

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
