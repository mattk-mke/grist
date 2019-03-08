# Grist
*The real-time grocery/shopping list*

## Problem
>> Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way. Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.

## Features

* Google authentication  
* Ability to create custom lists and live edit across devices
* View public lists but not change them
* Click on a list item to mark it as purchased/completed
* Prioritize items by "low", "medium", or "high"
* Real-time SQL databases updates using Pusher

## Future improvements

* UI/UX revamp
* User groups, work in progress

## Technologies used

At first thought I would have used Firebase or another real time database and it would have been much simpler. However to fulfill the split architecture requirement and showcase full stack dev skills, I decided to use what I was most comfortable with: NodeJS + ExpressJS + React + PostgreSQL.

The real-time requirement was implemented with Pusher - this was my first exposure to this API and it was quite helpful.

Redux state management was added to manage and persist authentication data to compliment the Google auth component and passport JWT.

For front-end, I ran out of time to refine it into what I had imagined. I placed back end as my first priority.



## Getting Started

1. Clone repo

2. Create ".env" file at root and add config variables (sent in email)

3. Create local PostgreSQL database:

`createdb -U postgres -w grist-dev`

`createdb -U postgres -w grist-test`

4. Migrate databases

`sequelize db:migrate && sequelize db:migrate`
`sequelize db:migrate --env=test && sequelize db:migrate --env=test`

5. Start servers

`yarn start`
`yarn start-react`

6. Run tests?

`yarn test`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

