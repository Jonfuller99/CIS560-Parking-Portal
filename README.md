# Technical Details: 
 - UI: HTML, Java script, CSS
 - Backend:  Node.js
 - Database: SQL server



# Project Structure:
## Frontend
> Each folder (except `Styles`) contains an `.html` and `.js` file.

### BuyPassPage  
Allows the user to create their account and select a pass to purchase. The user must first enter their license plate and state code in order to buy one of the four selected passes we have available.

### Homepage  
The main page of the parking portal.  
Features four navigation options:
- Officer Login  
- Person Login  
- Buy a Pass  
- Logout

### OfficerLogin  
Allows an officer to log in to their account using their assigned username and password. This verifies the officer's credentials before allowing them to issue tickets or view statistics.

### OfficerPage  
Provides the officer with inputs for assigning a ticket to a vehicle. The inputs accept a license plate, state code, and the lot where the violator was parked. This will automatically create a person if they are not already registered in the parking portal.

### PersonLogin  
Allows a person to log in to their account using their license plate and state code. It does not create a person if the license plate is invalid. Brings the user to the person page.

### PersonPage  
Interface where a user can view information about their currently owned pass and any tickets. The user can then pay those tickets on this page.

### StatsPage  
Shows statistical data for the parking system, including:
- Revenue from tickets  
- Most common day tickets are issued  
- Most popular pass type purchased

### Styles  
Contains the global `CSS` file used for styling the entire frontend.



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
BuyPass.sql - inserts a pass associated with a person, creating them if necessary

CheckTicket.sql - checks if a person is in violation of parking in a lot they have no access to

CreatePerson.sql - creates person if they don't already exist

FindTicket.sql - finds all unpaid tickets associated with a person

GetPasses.sql - gets all passes associated with a person

GiveTicket.sql - gives a ticket associated with a person, officer, and lot at the current time

OfficerLogin.sql - returns rows associated with a given officer username and hashed password

PayTicket.sql - updates the TimePaid field on a ticket given the associated PersonID, LotName, and DateIssued

PersonLogin.sql - returns rows assoicated with a give person license plate and state code

#### Aggregating Queries
GetMostCommonPassType - ranks pass tyes based off how common they are purchased in a certain timeframe, also returns the revenue from each pass

GetMostPopularTicketDay - ranks days of the week based off how many tickets were given on that day within a certain timeframe

GetTicketRevenue - returns days in which tickets were given and keeps track of ticket counts, sums, and average fees

OfficerRank - ranks the officers based off how much ticket revenue they have made for a certain month of a year.
