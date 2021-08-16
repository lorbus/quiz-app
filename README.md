# Quiz App

Quiz App is a test app for test purpose in order to attend a quiz, selected from a list of quizzes and check all 
previous quizzes results (based on https://github.com/softgandhi/ng2-quiz).

## Software Requirements to run the app locally

* Node.js (Backend - BE)
* Angular (Frontend - FE)

### Running the Application

1. Install Node.js

    * Node.js: https://nodejs.org
  
1. Run `npm install --save @angular/material @angular/cdk` to install the Angular Material UI

1. Run `npm install` at the project root to install the app dependencies

1. Run the following task to build the Angular app (to watch changes you make on the fly) and copy the built code to the `dist/quiz-app` folder: 

    `ng build --watch`

1. Run `npm start` or `ng serve` to build the TypeScript, watch for changes and launch the web server. 
   Run it in a separate terminal window, if you used '--watch' option, or in the same terminal if you used only 'ng build' command.

1. Browse to http://localhost:4200

1. Ctrl+C command to stop application


# Important Considerations

* App used only for test purpose:
1. A way to implement the current app is using the MEAN stack architecture (MongoDB, Express, Angular/AngularJS, Node.js),
other for i.e. could be use of Java, Spring boot and Angular/React for i.e.
1. No Database used, for real app a DB should be used, and the design of it, should take in consideration the current 
amount of data and/or the data in the future (NoSQL DB as MongoDB, could have less tables needed then a RDBMS, it depends
also from the amount of data). Indexind the DB tables, DB versioning (for RDBMS like Flyway etc.).
1. No security check used, for real app use of JWT token and bcrypt (to codify and decodify passwords) for i.e.
1. Not a real division between FE and BE, for a real app they could be also 2 different projects, so if in the future the FE / BE 
has to be changed, also with different technologies the impacts will be low, following MVC/MVP/MVVP design pattern.
1. For styles used Bootstrap, inline CSS and the styles/styles.css file. 
1. The current app is Single-Page App (SPA), for a real app different components could be created, with different routes 
(adding routing), in order for the project to evolve in the future and to be better maintainable.
1. Implementing tests (units and e2e).
1. All web services calls has been mocked, reading local JSON files, for a real app create REST APIs, and the URL 
can be passed to loadQuiz method, handle errors, Api testing for i.e. with Rest-Assured, Postman etc., 
and API specification with OpenApi, Swagger etc.
1. Building and deploying the real app, CI/CD, for i.e. on Cloud deployment with GitLab, GitHub, AWS, Jenkins, Travis etc.
1. Use of Docker for containerization with Swarm and/or Kubernetes.

* Other improvements
1. Register new users and delete registration to the quiz app by users.
1. Manage different roles and rights, for i.e. a user with role user (default role) can login or register, 
instead an admin can only be created or activated by another user with admin role.
User with role admin can update/delete/create quizzes.
1. Send mails with results of quizzes or when a new quiz has been created for i.e.
1. Use of Angular Material Components such as progress-bar, toast etc.
1. Add other properties to Quiz like Category model/table and Difficulty and add search filters by these options.
1. Add the new property Type to Question model/table, in order to determine the type of it, for the moment the only 
supported one is single choice option, but it can be multiple choise, Yes/No, True/False or an open question.



