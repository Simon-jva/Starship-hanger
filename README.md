# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
________________________________________________________________________________________________________________________________________________________________________________________

CSI 3150 Final Project Submission Template W26
Name: Simon Roeser
Project Option Chosen: Catalog 
Live App URL: http://localhost:5187/ (N/A — Run locally (see User Manual))
GitHub Repository URL:  https://github.com/Simon-jva/Starship-hanger

Technical Report & User Manual
_____________________________________
   
1.1 Project Overview (3 pts)

Welcome to the starship hanger, with this application you can view the empires finest ships and purchase them to be your own for your next daring mission.
This is website is a catalog of different spaceships that someone could purchase if they lived in a galaxy far far away (aka star wars!) for this project i had a 
really difficult time choosing what i wanted to do, for every project I like to explore something that is out of the box or hasnt been done before. After looking
over the options I was trying to think of a fun twist I could put on one and i came up with the idea to go out of the box and try to build something that would benifit
the galatic empire. (but truly the problem it would solve would be for enjoyment for those who are into the star wars francise.) So without further introduction let me introduce you to the starship hanger! I truly hope my project is one that you can see the fun of and enjoy. the starship hanger was based off of a youtube video for an ecommerce site that I watched and put my spin on, here is the link to the source

1.2 Component Architecture (5 pts)

app.jsx-
navbar.jsx-
Hero.jsx-
ships.jsx-
quickview.jsx-

List your components and explain how data flows between them. Use the following format:
• App.js: The root component. Holds the global state for (Cart/Score/Weather).
• Component Name (Cart.js): Receives props from (parent) and handles …
• Component Name…: Contains a useEffect hook to manage (Timer/API/Storage).
• …
1.3 Detailed Functionality (5 pts)
For each "Sophisticated" requirement, explain how you implemented it:
• Feature 1 (e.g., The Timer): Explain the logic. How does it reset? How does it trigger
the next question?
• Feature 2 (e.g., External API): Which API did you use? What data did you extract from
the JSON response?
• Feature 3 (e.g., Persistence): Explain how you used localStorage. When is data saved
and when is it retrieved?
• Feature 4: …
1.4 User Manual (How to Navigate) (5 pts)
• Step 1: Instructions for starting the app
• Step 2: Instructions for using the search/filter/cart
• Step 3: Instructions for viewing the final results/checkout
• Step 4: …
3. Technical Challenges & Solutions (5 pts)
Describe at least one major bug or logical hurdle you encountered during development. How did
you debug it? What did you learn about React (e.g., state updates, dependency arrays, etc.)?
4. Demo Video Link (5 pts)
URL: YouTube /Google Drive Link
(Note: Ensure the permissions are set so that anyone can view it)
