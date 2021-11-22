# Drawing App
### By [Donovan Gallaway](https://www.linkedin.com/in/donovan-gallaway/) and [Sarah Carter](https://www.linkedin.com/in/scarterwebdev/)

Visit the live site: 

## Introduction
This project is a submission for the Mintbean Hiring Hackathon. The goal of the Hackathon was to build an app that lets people express their creativity in a visual format. Together, we created a React-based drawing app that allows the user to draw their very own masterpiece in their browser. 

## How to Draw
After navigating to the Draw page, users can start creating the next Mona Lisa by selecting different options from the toolbar and clicking and dragging the mouse along the canvas. Change the pen width, the color, use the fill tool, or draw shapes, the choice is up to the artist!

## Technologies Used
- React
- react-router-dom
- Sass

## Components/Pages
- Header
- Footer
- Home
- Canvas
- Community

## REACT COMPONENT ARCHITECTURE
```
-> App
    -> Header
    -> Routes
        -> Route |path:"/"|
            -> Home
        -> Route |path:"/draw"|
            -> Canvas 
        -> Route |path:"/community"|
            -> Community
    -> Footer
```

## User Stories
- As a user, I can drag my mouse across the screen to make free-form lines.
- As a user, I can click the different pen tools in the toolbar to change the color or thickness of the line.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.