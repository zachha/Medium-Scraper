# Medium Scraper

![Medium Logo](public/img/medium.png "Medium Logo")

Medium Scraper is a Node.js based web application that uses the npm packages 'request' and 'cheerio' to scrape articles from the website Medium.  The application is powered by MongoDB, which stores all of the scraped articles and allows the user to save/unsave articles and to add or delete comments on any saved article!

You can see the website in action here: [Medium Scraper](https://lit-springs-23151.herokuapp.com/ "deployed application")

## Feature Overview

Medium Scraper contains several prominent features:

- Scrape Javascript articles from Medium.com (Different Categories coming soon)
- Save your favorite articles
- Add/delete comments from your saved articles

## Downloading the Application

This web application requires Node.js, MongoDB, and npm to run.  If all of these are installed on your computer, follow these steps:

```
git@github.com:zachha/News-Scraper.git
```

1. Clone the above repo to your machine

2. Navigate inside the project and install your node dependencies by typing:

```
npm i
```
3. Use your command line to run the application:

```
node server.js
```

4. If successful, your CLI will show you what port the application is running on.  Open your browser and go to the appropriate port to see the app in action!



## Libraries and Technologies
* [MongoDB](https://www.mongodb.com/ "MongoDB")
* [Node.js](https://nodejs.org/en/ "Node.js")
* [npm](https://www.npmjs.com/ "npm")
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/ "Bootstrap 4")
* [Handlebars](https://handlebarsjs.com/ "Handlebars")
* [cheerio](https://www.npmjs.com/package/cheerio "Cheerio")
* [request](https://www.npmjs.com/package/request "request")
* [body parser](https://www.npmjs.com/package/body-parser "body parser")
* [Heroku](https://dashboard.heroku.com "heroku")


## Known Bugs Being Investigated

- async issue with the scrape button not de-activating on the saved articles page. I need to prevent default and put in an ajax call myself instead of link to the /saved route

## Things to Come

I have a list of planned improvements that I'm working on:

- Selecting different categories of articles to pull from Medium and adding search functionality 

- Login integration and linking comments to specific users

- Popup showing how many items were scraped

- Limit articles to ~10 per page with button to see previous/next 10

- UI improvements/Style Changes

## Contact Info
	
##### **Zach Harmon [Github](https://www.github.com/zachha) - Full-Stack Developer**
##### zachha@gmail.com
	