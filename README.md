# Technical Details: 
 - UI: HTML, Java script, CSS
 - Backend:  Node.js
 - Database: SQL server



# Project structure:
## Frontend
## Backend
server.js - Main file for running the server and connects all auxilary files. Connects all the routes and listens on the port specfied in the .env file

.env - holds all envrionment variables like the DB_SERVER (server name), the DB_DATABASE (database name), and the PORT (the port for the server to listen into)
### config
db.js - connects and initializes the objects necessary for the database to run queries as needed
### models
sessionModel.js - provides an instance of all active sessions and appropriates associates the type of session (0 = person, 1 = officer) and the appropriate database id (dataID)
### routes
pageRoutes.js - direct routes that are prefixed with "/" to the appropriate request handler in pageController.js

jsRoutes.js - direct routes that are prefixed with "/js" to the appropriate request handler in jsController.js

styleRoutes.js - direct routes that are prefixed with "/style" to the appropriate request handler in styleController.js

authRoutes.js - direct routes that are prefixed with "/auth" to the appropriate request handler in authController.js

dbRoutes.js - direct routes that are prefixed with "/db" to the appropriate request handler in dbController.js
### controllers
pageController.js - serves requested html files

jsController.js - servers requested js files

styleController.js - server requested css files

authController.js - validates logins with the db and updates the sessionModel appropriately

dbController.js - interacts appropriately with the db based off request
 ## SQL
Tables.sql - initializes all tables within the database and also fills them with appropriate test data

### StoredProcedures
