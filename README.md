# Full Stack Open
> University of Helsinky - v.2024

![Full Stack Open header](fullstackopen_header.png)

In this repository you can find the solutions to the exercises proposed in the [Full Stack Open](https://fullstackopen.com/) course provided by the [University of Helsinki](https://www.helsinki.fi/en).

The main focus of this course is on building single page applications with ReactJS that use REST APIs built with Node.js. It covers testing, configuration and environment management, the use of databases for storing the application’s data and other aspects.

Among other technologies, React, Redux, Node.js, MongoDB, GraphQL and TypeScript will be used.

## Repository content
### [Part 0 - Fundamentals of Web apps](/part0/)

Diagrams showing the chain of events during network communications, comparing between Single Page Applications and  Traditional ones.

### [Part 1 - Introduction to React](/part1/)

Development of different React frontend projects focusing in props, event handlers and state management with hooks.

- [anecdotes](/part1/anecdotes/): SPA that shows a random anecdote from the field of software engineering that can be voted. It also shows the anecdote with the largest number of votes.
- [courseinfo](/part1/courseinfo/): SPA to show course information.
- [unicafe](/part1/unicafe/): A web application for collecting customer feedback and showing statistics.

The application must display the total number of collected feedback for each category. 

### [Part 2 - Communicating with server](/part2/)

Depelopment of different React frontend projects focusing in HTTP requests with axios, use of APIs, forms and render of collections of data form server.

- [countries](/part2/countries/): SPA  to view information from different countries, such as: languages, flag and weather.
- [courseinfo](/part2/courseinfo/): SPA to show course information. (Refactor from the part1).
- [phonebook](/part2/phonebook/): Phonebook app developed as SPA, connected to a JSON server.

### [Part 3 - Programming a server with NodeJS and Express](/part3/)

Development and deployment of a RESTful backend for the phonebook SPA made in part2 using Node.js with Express, MongoDB with Mongoose, middlewares as Morgan, and ESlint.

- [phonebook backend](/part3/backend/phonebook/)
- [phonebook frontend](/part3/frontend/phonebook/)

### [Part 4 - Testing Express servers, user administration](/part4/)

The first major theme will be writing unit and integration tests for the backend. User authentication and authorization based on tokens is also implemented within a TDD (Test Driven Development) approach.

- [bloglist](/part4/bloglist/): Development of a backend application of list of blogs, that allows users to save information about interesting blogs found on internet. For each listed blog: author, title, url and quantity of positive votes will be saved.

### [Part 5 - Testing React apps](/part5/)

In this part the integration tests are applied to the React frontend. User authentication and authorization module is also developed and implemented on the frontend to allow user login on the app.

The whole app is tested using End-to-End testing with [Playwright](https://playwright.dev/).

- [bloglist frontend](/part5/bloglist/frontend/): Development of the frontend for the backend implemented in part4 with login functionality and component's testing.
- [bloglist test with Playwright](/part5/bloglist/playwright/): Development of End-to-End tests with this library.

### [Part 6 - Advanced state management](/part6/)

In this section the administration of the state of the app is moved out of the componends. To do this, different approaches for managing states are applied:
- Redux: focused on client-side state management, based on [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview/) architecture.
    - [anecdotes with Redux](/part6/anecdotes-redux/)
    - [unicafe](/part6/unicafe-redux/)
- React Query: focused on server-side state management
    - [anecdotes with Query](/part6/anecdotes-query/)

### [Part 7 - React router, custom hooks, styling app with CSS and webpack](/part7/)

In this section React Router has been implemented in both state frameworks: Redux and Query. Then, some customized hooks have been developed. Finally the Bloglist App project from previous parts have been improved with those functionalities. 

Material UI has been applied over the Bloglist App project too, experimenting with a routed navbar and the implementation of different style components as the Cards, becoming a responsive web app.

- [Anecdotes with React router](/part7/anecdotes-routed/)
- [Ultimate hooks](/part7/ultimate-hooks/)
- [Country with customized hooks](/part7/country-hook/)
- [Bloglist App with Material UI](/part7/bloglist/)

### [Part 8 - GraphQL](/part8/)

This section implements GraphQL, the alternative to REST for communications client-server. 

The project developed consists of a Library App developed in React and Node.js. It implements user session management for different actions and stores the data in MongoDB using GraphQL communication.

- [library](/part8/library/)

### [Part 9 - TypeScript](/part9/)

This section is about TypeScript: the open-source superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this section, the tools introduced earlier to add end-to-end functionality with JavaScript are applied to different TypeScript projects.

- [firstSteps](/part9/firstSteps/)
- [courseInfo](/part9/courseInfo/)
- [flightDiary](/part9/flightDiary/)
- [patientor](/part9/patientor/)

### Part 10 - React Native

Under development...

### [Part 11 - CI/CD](https://github.com/bautista225/full-stack-open-part11-own-pipeline)

This section implements Github Workflows on some previous projects, applying different pipelines to check format and testing. Then, some projects are deployed to the web through Render.

### [Part 12 - Containers](/part12/)

This section deploys some previous projects using Docker containers.
