# DeCloset

## Demo: TBD

## Concept
DeCloset's goal is to help people cut down on clothing clutter and to provide them with information about local homeless shelters where they can donate unwanted items instead of just throwing them away.

## Inspirations
- Clothing and textile waste from "fast fashion" makes up a significant percentage of the Earth's waste. I strongly believe in consuming less, reusing and regifting what we don't need anymore, and finally recycling what we can no longer use
- A lot of clothing donated to thrift stores is ultimately thrown out as well
- While finding a homeless shelter that will take specific donations might be a little extra work, ultimately the clothing is going to help someone in need

## Installation Instructions
- fork and clone this repo
- cd into the directory and npm init
- npm i to install all dependencies
- sequelize init
- change the dialect to "postgres" and the database to "clutter_cause_dev"
- sequelize db:migrate
    - **NOTE** do not use the seed file until you create at least one user through the app
- create a .env and add a PORT and a SECRET_SESSION
- run nodemon open your localhost to the post you selected
- create a user
- sequelize db:seed:all

## Technologies Used
- Node.js and the following packages:
    - bcrypt
    - cheerio
    - connect-flash
    - dotenv
    - ejs
    - express
    - express-ejs-layouts
    - express-session
    - method-override
    - passport
    - passport-local
    - pg
    - request
    - sequelize
- Lucidchart
- Adobe InDesign
- Data scraping of (https://www.homelessshelterdirectory.org/)

## ERD
[Lucidchart ERD](https://lucid.app/invitations/accept/27d080a7-f4b7-420e-90ae-14f3bcc63bad)

## Wireframes
![Index](/Wireframe/Project_2_index.png)
![Create Account](/Wireframe/Project_2_create_new.png)
![Login](/Wireframe/Project_2_login.png)
![User Home](/Wireframe/Project_2_user_home.png)
![User Clothing Index](/Wireframe/Project_2_user_clothing_index.png)
![User Clothing New](/Wireframe/Project_2_clothing_new.png)
![User Clothing Detail](/Wireframe/Project_2_user_clothing_detail.png)
![User Clothing Edit](/Wireframe/Project_2_user_clothing_edit.png)
![Shelter Search](/Wireframe/Project_2_shelter_search.png)
![Shelter Results](/Wireframe/Project_2_shelter_results.png)
![Shelter Result Detail](/Wireframe/Project_2_shelter_result_detail.png)
![User Saved Shelters](/Wireframe/Project_2_user_saved_shelters.png)
![Saved Shelter Detail](/Wireframe/Project_2_saved_shelter_detail.png)

## Development Plan
[x] Backend-only with little frontend usability
[x] Front-end functional but not styled or user-focused
[x] Front-end styled, additional links and routes created to improve user experience (**Current Stage**)
[] Add recycling API and more precise shelter search
[] Allow users to interact with other users in their area and request, trade, and gift clothing

## MVP
- The majority of the app requires a login. The exceptions are the shelter search and results pages
- The user can create entries for their clothes and categorize them by KEEP, DONATE, and TRASH
    - The user can edit and delete these items once they are saved
- The user can also search for (by city and state) and save homeless shelters to their list
    - Shelters can also be deleted from the user's saved list
- When the user decides to donate an article of clothing, they can select a shelter from their saved list from a drop-down menu on the clothing detail page
- The user can also see past donated items on the saved shelter detail pages

## Stretch Goals
[] Add category filter to clothing/index
[] Add vanilla js static file to improve the front end
[] Allow users to upload photos of their clothing
[] Add recycling API to offer additional options for TRASH
[] Make shelter search more precise (shelters within a radius instead of everything in a city)
[] Expand so that users can interact with others (post unwanted items, request other peoples' items, trade, etc)

## Challenges

### Solved issues
- Updating the category when editing a clothing page. 
- Displaying both clothing detail and a user's saved shelters on the clothing detail page

### Unsolved issues
- I don't want to jinx myself, but... none? Everthing appears to be working fine

## Acknowledgments
- My General Assembly instructors Taylor, Mateen, Fatima, Khoury, and Sarah
- Monica and Justin for their help when I was banging my head against the wall
- Cora and Tali for being the best furry assistants
- Andy for still liking me even after I became a code gremlin and making sure I remember to eat

## Demo: TBA

## Versioning & Releases
- 11/14/20 - initial release

## Author
Elizabeth Guerra