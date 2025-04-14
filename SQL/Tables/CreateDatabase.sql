IF SCHEMA_ID(N'Parking') IS NULL
    EXEC(N'CREATE SCHEMA[Parking];');
GO

DROP TABLE IF EXISTS Parking.Tickets;
DROP TABLE IF EXISTS Parking.Passes;
DROP TABLE IF EXISTS Parking.Accessibility;
DROP TABLE IF EXISTS Parking.Lots;
DROP TABLE IF EXISTS Parking.LotTypeYears;
DROP TABLE IF EXISTS Parking.PassTypeYears;
DROP TABLE IF EXISTS Parking.Officers;
DROP TABLE IF EXISTS Parking.People;
DROP TABLE IF EXISTS Parking.LotTypes;
DROP TABLE IF EXISTS Parking.PassTypes;
DROP TABLE IF EXISTS Parking.StateCodes;
GO

/*
Create Tables
*/
CREATE TABLE Parking.StateCodes
(
    StateCode CHAR(2) PRIMARY KEY
);

CREATE TABLE Parking.People(
    PersonID INT PRIMARY KEY,
    LicensePlate VARCHAR(6) NOT NULL,
    StateCode CHAR(2) NOT NULL,
    Email VARCHAR(100),
    UNIQUE (StateCode, LicensePlate),
    FOREIGN KEY (StateCode) REFERENCES Parking.StateCodes(StateCode)
);

CREATE TABLE Parking.PassTypes (
    PassType VARCHAR(2) PRIMARY KEY
);

CREATE TABLE Parking.PassTypeYears (
    PassTypeYearID INT PRIMARY KEY,
    PassType VARCHAR(2) NOT NULL,
    YearOfValidity INT NOT NULL,
    Price DECIMAL(8,2) NOT NULL,
    CONSTRAINT UQ_PassType_Year UNIQUE (PassType, YearOfValidity),
    FOREIGN KEY (PassType) REFERENCES Parking.PassTypes(PassType)
);

CREATE TABLE Parking.Passes (
    PassID INT PRIMARY KEY,
    PassTypeYearID INT NOT NULL,
    PersonID INT NOT NULL,
    TimePurchased DATETIMEOFFSET NOT NULL,
    CONSTRAINT UQ_Passes_PassTypeYear_Person UNIQUE (PassTypeYearID, PersonID),
    FOREIGN KEY (PassTypeYearID) REFERENCES Parking.PassTypeYears(PassTypeYearID),
    FOREIGN KEY (PersonID) REFERENCES Parking.People(PersonID)
);

CREATE TABLE Parking.LotTypes (
    LotType VARCHAR(2) PRIMARY KEY
);

CREATE TABLE Parking.LotTypeYears (
    LotTypeYearID INT PRIMARY KEY,
    LotType VARCHAR(2) NOT NULL,
    YearOfValidity INT NOT NULL,
    Fee DECIMAL(8,2) NOT NULL,
    CONSTRAINT UQ_LotType_Year UNIQUE (LotType, YearOfValidity),
    FOREIGN KEY (LotType) REFERENCES Parking.LotTypes(LotType)
);

CREATE TABLE Parking.Accessibility (
    PassType VARCHAR(2) NOT NULL,
    LotType VARCHAR(2) NOT NULL,
    PRIMARY KEY (PassType, LotType),
    FOREIGN KEY (PassType) REFERENCES Parking.PassTypes(PassType),
    FOREIGN KEY (LotType) REFERENCES Parking.LotTypes(LotType)
);

CREATE TABLE Parking.Lots (
    LotID INT PRIMARY KEY,
    LotName VARCHAR(50) UNIQUE NOT NULL,
    LotType VARCHAR(2) NOT NULL,
    FOREIGN KEY (LotType) REFERENCES Parking.LotTypes(LotType)
);

CREATE TABLE Parking.Officers (
    OfficerID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    HashPassword VARCHAR(255) NOT NULL,
    UserName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Parking.Tickets (
    TicketID INT PRIMARY KEY,
    OfficerID INT NOT NULL,
    PersonID INT NOT NULL,
    LotID INT NOT NULL,
    TimeIssued DATETIMEOFFSET NOT NULL,
    Fee DECIMAL(8,2) NOT NULL,
    LateCharge DECIMAL(8,2) NOT NULL,
    TimePaid DATETIMEOFFSET,
    FOREIGN KEY (OfficerID) REFERENCES Parking.Officers(OfficerID),
    FOREIGN KEY (PersonID) REFERENCES Parking.People(PersonID),
    FOREIGN KEY (LotID) REFERENCES Parking.Lots(LotID)
);