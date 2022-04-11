# Description

This project was developed for a pizzabot challenge.
Pizzabot - a robot that delivers pizza. 
The task is to instruct Pizzabot on how to deliver pizzas to all the houses 
in a neighborhood. In more specific terms, given a grid (where each point on the 
grid is one house) and a list of points representing houses in need of pizza delivery.  
Script should return a list of instructions for getting Pizzabot to those locations and delivering pizza.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the bot you need to 
- clone this repo
- `cd pizzabot`
- `npm install`

## To run in the development mode:

In the project directory:

### `npm start`

Runs the app in .\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

There will be an input to type instructions for pizzabot in it

Correct format for instruсtions is string, ex. `5x5 (1, 3) (4, 4)`

Where 5x5 is board size and then pairs of coordinates are provided in parentheses

When you type instructions press enter or click `Start delivery` button

The answer and the board should appear and pizzabot will start delivery🍕😃 One by one steps will appear on the screen and if pizzabot reached the point of destination he drops the pizza🍕
If there are some problems with inserted instructions validation message would appear.

Pizzabot always starts at the origin point, (0, 0). As with a Cartesian plane, this point lies at the most south-westerly point of the grid.

The instruction is one of:
N: Move north
S: Move south
E: Move east
W: Move west
D: Drop pizza
 

For `5x5 (1, 3) (4, 4)` one correct solution would be: ENNNDEEEND


## To run tests
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.




