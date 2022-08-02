# Complete MERN project folder structure -

Generaly when we start working on full stack project with `Node.js`,`Mongo DB` and `React.Js` technology. We make different folder structure or server resources for server and client. There would be separate directory or project repositories we used. This will be preferable for teams those working on separate technology.

`But`, In order to reduce cost of the different server and resources, complication to maintain different repositories on git, the project is in small scale and if you are beginner and wanted to learn all the aspects in MERN project and desire to keep track of all your practice work in one directory or repository (so that you can recall itin future) then I have good solution for folder struture. as follows -

We can divide folder structure in 3 parts -

### `Backend`
### `Frontend`
### `Global`

## `Backend`
1. This is the server part of the application and we will create all the stuff related to server in this directory.
2. We will have to make separate node_module folder for backend using initiating the node package. So, using this special package.json we can install all the packages which is only required for server related developement. 
3. We can add Mocha/Tea testing framework that is used to perform tests within our application.It makes sure everything works correctly. 
4. Commands to create Node.js project in Backend folder.

### `$ npm init` OR `$ npm init -y`
- initiate node in folder and this will create package.json and  package.lock
### `$ npm install --save-dev babel-cli` 
- Babel is mainly used to compile JavaScript code, which will have backward compatibility.
### `$ npm i body-parser` 
- Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
### `$ npm i mongodb` 
- install mongodb package in folder - we will gonna use mongoose for connection between node and mongodb database  
### `$ npm i mongoose` 
- Object Data Modeling (ODM) library for MongoDB and Node. Mongoose provides a straight-forward, schema-based solution to model your application data.
### `$ npm i nodemon` 
- Simple monitoring tool, tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected. 
### `$ npm i validator`  
- Vaidator is very popular pacge that used to make validation in a easy way for any form. 

### `npm run build`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
`eject`


For Express Js project structure - please refere below blog link
https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/

2. For complete MERN project setup please follow the link -
https://www.querythreads.com/how-to-organise-file-structure-of-backend-and-frontend-in-mern/

3. For middleware refere link - 
https://mongoosejs.com/docs/middleware.html#pre

4. For virtual in mongoose refere link - 
https://mongoosejs.com/docs/tutorials/virtuals.html

5. 