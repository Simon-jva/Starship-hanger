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
Live App URL:
git clone https://github.com/Simon-jva/Starship-hanger.git
cd Starship-hanger
npm install
npm run dev
http://localhost:5187/ (N/A — Run locally (see User Manual))
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

app.jsx- this file holds the global status for mainly operations that have to do with viewing the cart and inventory (cart, inventory, cartopen, addtocart, removefrom cart, inventory) and renders the side bar

navbar.jsx- for the nav bar when you click on "order" you can view the cart, this recieves cartcount and reacts on oncartclick. when clicking that order button it attomatically opens up the side bar to view your order 

Hero.jsx- this was purley for my enjoyment. I watched a youtube video on react websites and saw they added a fun triangle underneath the nav bar and i really wanted to add something fun like that to stand out. I used this errea for taglines, logos, and an order now button

ships.jsx- this right here is the main component, https://swapi.dev/api/starships/ for all of the information about the different space ships. this file manages all of the ships, pages of ships, quickvies, sort, and tracks inventory

quickview.jsx- the quick view is a side bar thaqt recievs chip objects and counts stock. I used a slide out side panel that I learned about earlier in the school year. this renders stocks status and the add to cart button and using useeffect to listen for when some clicks out of quick view

Inventory.jsx- listens to appo.jsx to recieve inventory, it displays all ships and ids with how many ships are left in stoc. is also has a summary card for the total units and if its getting low it turns yellow then red out of stock 

Cart.jsx- this recieves cartonupdatyqty and onremove from app. it displays all of the cart items with how many units are left.

1.3 Detailed Functionality (5 pts)

SWAPI- starship hanger grabs data from  https://swapi.dev/api/starships/?page=${page} inside a useeffect in the ship file. it extracts all of the information that the ships have (credits, name, starship_class, manufacturer, length, crew, passengers, exct...) and is then handled by tracking pages and using data.count to calculate all of the pages

simulated inventory- beacuse there was no set invfentory and each ship is ussually unique like the millenium falcon we had to simulate ship inventory. each ship id mapped to a stock count that was defined by the shipstock object in app.jsx when a use clicked add to cart the inventory decrements by 2 when an item was removed it was restored, if an item reached 0 the add to csart button was dissabled 

cart state- this lives in the app file as an array for ship objecys with a qauntity field. addtocart checks to see if an entry was created and adds toe the qauntity. removefromcart filters out the item and returns it to the inventory. the cart side bar shows each item in the card with a line item of its details 

price- the ship file maintains a sort with high and low prices. the sorted array is proccessed by spreading and sorting ships based on cost_in_credits. 

quick view- clicking on the quick view button on any card creats the quickview state for the card that was clicked. this renders all of the information given to use by swapi for the ceratin ship

1.4 User Manual (How to Navigate) (5 pts)

step 1- starting the app run this in your terminalI used react and vite 
git clone https://github.com/Simon-jva/Starship-hanger.git
cd Starship-hanger
npm install
npm run dev
then open at  http://localhost:5173

step 2- you can scroll through 4 lists of ships and sort highest to lowest on all of them 
step 3- by clicking quick view a side panel pulls up with all of the information
step 4- to add to cart click the add to cart button 
step 4- to view your cart scroll to the top and click on order (top right)

3. Technical Challenges & Solutions (5 pts)

I tried including images as well by implementing another api from starwars-visualguide.com. they ended up being blocked, i tried to vibe code the situation out because i really wanted images but they ended up being blocked behind a wall so I decided to drop the idea entirly. 

another issue i had was the inventory state wasnt paired up properly, after struggling with that for hours i asked claude to fix it then claude ended up destroying half of my project so I ended up going to youtube to figure it out and luckily it was just a simple fix with lifting inventory state up to app and passing it through as props to both ships and inventory. this helped teach me the pattern of lifting state up in closest common ancestor components 

also my browser kept going white, that might just be a vite thing but i had to keep re running the app 


4. Demo Video Link (5 pts)
URL: [YouTube /Google Drive Link](https://www.youtube.com/watch?v=XuhBASC7pHM)

