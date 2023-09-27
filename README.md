# YummyGreek

Welcome to the My React Restaurant App! This project is a web application built using React that allows users to view and interact with a menu of delicious dishes.

## Features

- View a menu of various dishes.
- Check details for a specific dish.
- Add dishes to your basket.
- Remove dishes from your basket.
- Filter dishes based on different criteria.

## Installation

Follow these steps to set up and run the My React Restaurant App locally on your machine:

1. git clone https://github.com/Melissopoulos/YummyGreek.git
2. cd yummy-greek
3. npm install
4. json-server --watch db.json --port 8000
5. npm start
6. Check the app on your http://localhost:3000/

## Modifying the JSON Database

The data in this project is stored in a JSON file named `db.json`. If you wish to modify or update the menu items, follow these steps:

1. Locate the `db.json` file in the project directory.

2. Open the `db.json` file using a text editor or code editor of your choice.

3. You will find an array of objects, each representing a menu item. Here is an example of the structure:

   ```json
   [
     {
       "id": 1,
       "name": "Moussaka",
       "description": "..."
       // Other properties
     },
     // More menu items...
   ]
Make the desired changes to the menu items in the JSON file. You can update the name, description, price, ingredients, tags, and other properties as needed.

Save the changes to the db.json file.

Restart the development server (if it's running) using the following command:


