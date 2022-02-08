# Pizza N Go 

Pizza N Go is a food ordering app that is made for the user and the owner of the restaurant. The user is able to look over the menu, add items to the cart and login or sign up to place the order. On the admin side, the order comes in dinamically and the receiver writes how many minutes until the order is ready. That triggers a text message to the user and a dynamic update on the user side. The admin can also check orders in progress and completed orders. This project is fully responsive for all screen sizes. 

## Tech Stack
- Javascript
- jQuery
- NodeJS
- Express
- EJS
- SCSS
- Design: https://www.figma.com/file/FBqgvdYz3vMUL1E9YTbZyp/Pizza-n-go?node-id=1109%3A1908

## Screenshots

Landing page:

!["screenshot description"](https://github.com/sidpatel93/Pizza-N-Go/blob/master/screenshots/landing-page.png)


Cart with some items:

!["screenshot description"](https://github.com/sidpatel93/Pizza-N-Go/blob/master/screenshots/cart.png)


The users order confirmation:

!["screenshot description"](https://github.com/sidpatel93/Pizza-N-Go/blob/master/screenshots/order-confirmation.png)


Admin landing page after logging in:

!["screenshot description"](https://github.com/sidpatel93/Pizza-N-Go/blob/master/screenshots/admin-landing.png)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
