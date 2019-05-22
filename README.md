# Dram
Dram is an application designed to enhance whiskey tastings by allowing users to participate in live whiskey tastings, view and share their reviews instantly, and provide searchable historical data. Once a user submits their blind tasting ratings and reviews, they are then shown the results of the tasting including the overall average rating of each whiskey along with detailed information about each whiskey they tasted. Users are able to search previous tastings, previous whiskies tasted, and reviews. Users can save their favorite whiskies to view on their home page. The application allows for three types of users - guests, users, and admin users.

![](dram.gif)

## Installation
1. Clone this repo: `git@github.com:wlmathison/dram.git`
1. To install all libraries and their dependencies, run `npm install`
1. Rename database.json.example by running `git mv database.json.example database.json`
1. In the `/api` directory, run `json-server -p 5002 database.json`
1. Run `npm start` in root directory to start react server

### Technologies
Project created using </br>
[React](https://reactjs.org/) </br>
[reactstrap](https://reactstrap.github.io/) </br>

### Author
Billy Mathison
