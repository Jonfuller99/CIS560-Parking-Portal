IF SCHEMA_ID(N'Parking') IS NULL
    EXEC(N'CREATE SCHEMA [Parking];');
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
    PersonID INT IDENTITY(1,1) PRIMARY KEY,
    LicensePlate VARCHAR(6) NOT NULL,
    StateCode CHAR(2) NOT NULL FOREIGN KEY REFERENCES Parking.StateCodes(StateCode),
    Email VARCHAR(100),
    UNIQUE (StateCode, LicensePlate),
    
);

CREATE TABLE Parking.PassTypes (
    PassType VARCHAR(2) PRIMARY KEY
);

CREATE TABLE Parking.PassTypeYears (
    PassTypeYearID INT IDENTITY(1,1) PRIMARY KEY,
    PassType VARCHAR(2) NOT NULL,
    YearOfValidity INT NOT NULL,
    Price DECIMAL(8,2) NOT NULL,
    CONSTRAINT UQ_PassType_Year UNIQUE (PassType, YearOfValidity),
    FOREIGN KEY (PassType) REFERENCES Parking.PassTypes(PassType)
);

CREATE TABLE Parking.Passes (
    PassID INT IDENTITY(1,1) PRIMARY KEY,
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
    LotTypeYearID INT IDENTITY(1,1) PRIMARY KEY,
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
    LotID INT IDENTITY(1,1) PRIMARY KEY,
    LotName VARCHAR(50) UNIQUE NOT NULL,
    LotType VARCHAR(2) NOT NULL,
    FOREIGN KEY (LotType) REFERENCES Parking.LotTypes(LotType)
);

CREATE TABLE Parking.Officers (
    OfficerID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    HashPassword VARCHAR(255) NOT NULL,
    UserName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Parking.Tickets (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
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








INSERT INTO Parking.StateCodes (StateCode)
VALUES
    ('AL'), ('AK'), ('AZ'), ('AR'), ('CA'),
    ('CO'), ('CT'), ('DE'), ('FL'), ('GA'),
    ('HI'), ('ID'), ('IL'), ('IN'), ('IA'),
    ('KS'), ('KY'), ('LA'), ('ME'), ('MD'),
    ('MA'), ('MI'), ('MN'), ('MS'), ('MO'),
    ('MT'), ('NE'), ('NV'), ('NH'), ('NJ'),
    ('NM'), ('NY'), ('NC'), ('ND'), ('OH'),
    ('OK'), ('OR'), ('PA'), ('RI'), ('SC'),
    ('SD'), ('TN'), ('TX'), ('UT'), ('VT'),
    ('VA'), ('WA'), ('WV'), ('WI'), ('WY'), ('DC');


    -- Sample insert for 100 people
INSERT INTO Parking.People (LicensePlate, StateCode, Email)
VALUES
('ABC123', 'CA', 'john.doe1@example.com'),
('XYZ456', 'NY', 'jane.doe2@example.com'),
('LMN789', 'TX', 'mike.smith3@example.com'),
('DEF321', 'FL', 'anna.jones4@example.com'),
('GHI654', 'WA', 'tom.brown5@example.com'),
('JKL987', 'IL', 'lisa.wilson6@example.com'),
('QWE852', 'GA', 'dave.taylor7@example.com'),
('RTY963', 'NC', 'emma.thomas8@example.com'),
('UIO741', 'PA', 'alex.moore9@example.com'),
('PAS369', 'OH', 'susan.jackson10@example.com'),

('CAR159', 'MI', 'ryan.white11@example.com'),
('ZXC753', 'VA', 'laura.harris12@example.com'),
('VBN258', 'AZ', 'chris.martin13@example.com'),
('MNB456', 'MA', 'nina.thompson14@example.com'),
('PLM357', 'CO', 'steve.garcia15@example.com'),
('OKM951', 'TN', 'karen.martinez16@example.com'),
('EDC852', 'IN', 'bruce.robinson17@example.com'),
('RFV147', 'MO', 'kelly.clark18@example.com'),
('TGB963', 'WI', 'jim.lewis19@example.com'),
('YHN741', 'MN', 'megan.lee20@example.com'),

('UJM159', 'NJ', 'zach.walker21@example.com'),
('IKJ753', 'AL', 'tina.hall22@example.com'),
('OLP258', 'SC', 'eric.allen23@example.com'),
('MKO456', 'KY', 'abby.young24@example.com'),
('NHY357', 'LA', 'daniel.king25@example.com'),
('BGV951', 'OK', 'lori.wright26@example.com'),
('CXZ852', 'IA', 'brian.scott27@example.com'),
('SDX147', 'KS', 'julie.green28@example.com'),
('WER963', 'NV', 'tyler.baker29@example.com'),
('RTG741', 'AR', 'beth.adams30@example.com'),

('ZHU159', 'OR', 'aaron.nelson31@example.com'),
('XCV753', 'MS', 'katie.hill32@example.com'),
('RTF258', 'UT', 'josh.ramirez33@example.com'),
('FDS456', 'NE', 'gina.campbell34@example.com'),
('POI357', 'NM', 'marcus.mitchell35@example.com'),
('LKI951', 'CT', 'olivia.roberts36@example.com'),
('PLM852', 'AK', 'ethan.carter37@example.com'),
('KJU147', 'NH', 'rachel.phillips38@example.com'),
('LOP963', 'HI', 'jacob.evans39@example.com'),
('MNB741', 'ME', 'ashley.turner40@example.com'),

('HGF159', 'RI', 'brandon.torres41@example.com'),
('TRE753', 'DE', 'natalie.parker42@example.com'),
('EWS258', 'ID', 'henry.collins43@example.com'),
('WSX456', 'MT', 'sophie.edwards44@example.com'),
('QAZ357', 'ND', 'jack.stewart45@example.com'),
('EDC951', 'SD', 'brianna.sanchez46@example.com'),
('RFV852', 'VT', 'dylan.morris47@example.com'),
('TGB147', 'WV', 'claire.rogers48@example.com'),
('YHN963', 'WY', 'kevin.reed49@example.com'),
('UJM741', 'DC', 'samantha.cook50@example.com'),

('IKM159', 'CA', 'leo.bell51@example.com'),
('OLN753', 'NY', 'maria.murphy52@example.com'),
('MKO258', 'TX', 'james.bailey53@example.com'),
('NHU456', 'FL', 'ella.rivera54@example.com'),
('BGI357', 'WA', 'logan.cooper55@example.com'),
('CXO951', 'IL', 'chloe.richardson56@example.com'),
('SDA852', 'GA', 'sean.cox57@example.com'),
('WER147', 'NC', 'ivy.howard58@example.com'),
('RTG963', 'PA', 'nathan.ward59@example.com'),
('ZHU741', 'OH', 'clara.perez60@example.com'),

('XCV159', 'MI', 'patrick.gray61@example.com'),
('RTF753', 'VA', 'zoe.james62@example.com'),
('FDS258', 'AZ', 'cody.watson63@example.com'),
('POI456', 'MA', 'lucy.brooks64@example.com'),
('LKI357', 'CO', 'caleb.kelly65@example.com'),
('PLM951', 'TN', 'hailey.sanders66@example.com'),
('KJU852', 'IN', 'cole.price67@example.com'),
('LOP147', 'MO', 'eva.bennett68@example.com'),
('MNB963', 'WI', 'owen.wood69@example.com'),
('HGF741', 'MN', 'bella.barnes70@example.com'),

('TRE159', 'NJ', 'isaac.ross71@example.com'),
('EWS753', 'AL', 'madison.henderson72@example.com'),
('WSX258', 'SC', 'gavin.coleman73@example.com'),
('QAZ456', 'KY', 'lily.patterson74@example.com'),
('EDC357', 'LA', 'blake.long75@example.com'),
('RFV951', 'OK', 'sara.jenkins76@example.com'),
('TGB852', 'IA', 'bradley.perry77@example.com'),
('YHN147', 'KS', 'juliana.powell78@example.com'),
('UJM963', 'NV', 'carson.russell79@example.com'),
('IKM741', 'AR', 'sienna.sullivan80@example.com'),

('OLN159', 'OR', 'andrew.bryant81@example.com'),
('MKO753', 'MS', 'morgan.rose82@example.com'),
('NHU258', 'UT', 'tristan.hamilton83@example.com'),
('BGI456', 'NE', 'elena.griffin84@example.com'),
('CXO357', 'NM', 'jared.diaz85@example.com'),
('SDA951', 'CT', 'melanie.hayes86@example.com'),
('WER852', 'AK', 'luke.myles87@example.com'),
('RTG147', 'NH', 'sasha.foster88@example.com'),
('ZHU963', 'HI', 'adam.gibson89@example.com'),
('XCV741', 'ME', 'chase.harper90@example.com'),

('RTF159', 'RI', 'kate.black91@example.com'),
('FDS753', 'DE', 'noah.matthews92@example.com'),
('POI258', 'ID', 'sophie.obrien93@example.com'),
('LKI456', 'MT', 'colin.stanley94@example.com'),
('PLM357', 'ND', 'julia.chapman95@example.com'),
('KJU951', 'SD', 'max.schmidt96@example.com'),
('LOP852', 'VT', 'aria.bowman97@example.com'),
('MNB147', 'WV', 'niko.hayes98@example.com'),
('HGF963', 'WY', 'taylor.johnston99@example.com'),
('TRE741', 'DC', 'faith.ellis100@example.com');


INSERT INTO Parking.PassTypes(PassType)
VALUES
    ('A'), ('B'), ('C'), ('D'), ('W');

    
INSERT INTO Parking.LotTypes(LotType)
VALUES
    ('A'), ('B'), ('C'), ('D'), ('W');


INSERT INTO Parking.PassTypeYears (PassType, YearOfValidity, Price)
VALUES
('A', 2023, 200.00),
('B', 2023, 250.00),
('C', 2023, 300.00),
('D', 2023, 350.00),
('W', 2023, 0.00),

('A', 2024, 250.00),
('B', 2024, 300.00),
('C', 2024, 350.00),
('D', 2024, 400.00),
('W', 2024, 0.00),

('A', 2025, 300.00),
('B', 2025, 350.00),
('C', 2025, 400.00),
('D', 2025, 450.00),
('W', 2025, 0.00);

INSERT INTO Parking.Passes (PassTypeYearID, PersonID, TimePurchased)
SELECT
    pty.PassTypeYearID,
    v.PersonID,
    DATEFROMPARTS(v.YearOfValidity, v.[Month], v.[Day])  -- or SYSDATETIMEOFFSET()
FROM (
    VALUES
        ('A', 2023, 3, 14, 1),
        ('B', 2023, 5, 22, 2),
        ('C', 2023, 7, 19, 3),
        ('D', 2023, 8, 30, 4),
        ('W', 2023, 12, 1, 5),

        ('A', 2023, 3, 14, 5),
        ('B', 2023, 5, 22, 6),
        ('C', 2023, 7, 19, 7),
        ('D', 2023, 8, 30, 8),
        ('W', 2023, 12, 1, 9),

        ('A', 2023, 3, 14, 9),
        ('B', 2023, 5, 22, 10),
        ('C', 2023, 7, 19, 11),
        ('D', 2023, 8, 30, 12),
        ('W', 2023, 12, 1, 13),

        ('A', 2023, 3, 14, 14),
        ('B', 2023, 5, 22, 15),
        ('C', 2023, 7, 19, 16),
        ('D', 2023, 8, 30, 17),
        ('W', 2023, 12, 1, 18),

        ('A', 2023, 3, 14, 20),
        ('A', 2023, 5, 22, 21),
        ('A', 2023, 7, 19, 22),
        ('A', 2023, 8, 30, 23),
        ('A', 2023, 12, 1, 24),

        ('A', 2023, 3, 14, 25),
        ('A', 2023, 5, 22, 26),
        ('A', 2023, 7, 19, 27),
        ('A', 2023, 8, 30, 28),
        ('A', 2023, 12, 1, 29),
        
        ('B', 2023, 3, 14, 30),
        ('B', 2023, 5, 22, 31),
        ('B', 2023, 7, 19, 32),
        ('B', 2023, 8, 30, 33),
        ('B', 2023, 12, 1, 34),

        ('A', 2024, 1, 12, 6),
        ('B', 2024, 3, 8, 7),
        ('C', 2024, 6, 18, 8),
        ('D', 2024, 9, 25, 9),
        ('W', 2024, 11, 3, 10),

        ('A', 2024, 1, 12, 10),
        ('B', 2024, 3, 8, 11),
        ('C', 2024, 6, 18, 12),
        ('D', 2024, 9, 25, 13),
        ('W', 2024, 11, 3, 14),

        ('A', 2024, 1, 12, 15),
        ('B', 2024, 3, 8, 16),
        ('C', 2024, 6, 18, 17),
        ('D', 2024, 9, 25, 18),
        ('W', 2024, 11, 3, 19),

        ('A', 2024, 1, 12, 20),
        ('A', 2024, 3, 8, 21),
        ('A', 2024, 6, 18, 22),
        ('A', 2024, 9, 25, 23),
        ('A', 2024, 11, 3, 24),

        ('B', 2024, 1, 12, 25),
        ('B', 2024, 3, 8, 26),
        ('B', 2024, 6, 18, 27),
        ('B', 2024, 9, 25, 28),
        ('B', 2024, 11, 3, 29),

        ('C', 2024, 1, 12, 30),
        ('C', 2024, 3, 8, 31),
        ('C', 2024, 6, 18, 32),
        ('C', 2024, 9, 25, 33),
        ('C', 2024, 11, 3, 34),

        ('A', 2025, 2, 9, 11),
        ('B', 2025, 4, 15, 12),
        ('C', 2025, 5, 27, 13),
        ('D', 2025, 7, 6, 14),
        ('W', 2025, 10, 20, 15),

        ('A', 2025, 2, 9, 16),
        ('B', 2025, 4, 15, 17),
        ('C', 2025, 5, 27, 18),
        ('D', 2025, 7, 6, 19),
        ('W', 2025, 10, 20, 20),

        ('A', 2025, 2, 9, 20),
        ('B', 2025, 4, 15, 21),
        ('C', 2025, 5, 27, 22),
        ('D', 2025, 7, 6, 23),
        ('W', 2025, 10, 20, 24),

        ('A', 2025, 2, 9, 25),
        ('A', 2025, 4, 15, 26),
        ('A', 2025, 5, 27, 27),
        ('A', 2025, 7, 6, 28),
        ('A', 2025, 10, 20, 29),

        ('D', 2025, 2, 9, 30),
        ('D', 2025, 4, 15, 31),
        ('D', 2025, 5, 27, 32),
        ('D', 2025, 7, 6, 33),
        ('D', 2025, 10, 20, 34)
) AS v(PassType, YearOfValidity, [Month], [Day], PersonID)
INNER JOIN Parking.PassTypeYears pty
    ON v.PassType = pty.PassType AND v.YearOfValidity = pty.YearOfValidity;



INSERT INTO Parking.LotTypeYears (LotType, YearOfValidity, Fee)
VALUES
('A', 2023, 20.00),
('B', 2023, 30.00),
('C', 2023, 40.00),
('D', 2023, 50.00),
('W', 2023, 100.00),

('A', 2024, 30.00),
('B', 2024, 40.00),
('C', 2024, 50.00),
('D', 2024, 60.00),
('W', 2024, 120.00),

('A', 2025, 35.00),
('B', 2025, 45.00),
('C', 2025, 55.00),
('D', 2025, 65.00),
('W', 2025, 120.00);


INSERT INTO Parking.Officers (FirstName, LastName, HashPassword, UserName)
VALUES
('Jon', 'Fuller', 'fcec29142240d73631cb2e865ef2b8f245e8ea3a563904f021cee043c8ce2eee', 'Fullerj'),
('Christian', 'Ramirez', '2999127c9a93e04ef8c83633bc27b6fbf1a05a113a8d84260d566a1c207e6a0f', 'Ramirezc'),
('Christian', 'Bartel', 'ed9d6a077c51a22642408369ba82bd3629bd041e9fc3ecde84b5e642dc554ded', 'Bartelc'),
('Taylor', 'Reynolds', '23d389406e2eae48cdc9c28745a11b239395792aa2cce8d7afe7804a85516443', 'Reynoldst'),
('Avery', 'Thompson', 'd7e64e83f66fa879a18dfae667a907311589d5b7422b791e16da413f49bb9101', 'Thompsona'),
('Riley', 'Carson', '7ca28419b0ca4cd664faaab8122a4f76493441077f7f577e8844ae0701fef43a', 'Carsonr'),
('Quinn', 'Wallace', 'da79e659bbdd5b0fbfa11957fb1beaa1f672a8d64521b6a0b06b3658032e618e', 'Wallaceq'),
('Drew', 'Harper', '26238936236e15e8fe1f25e357a5fd2cadc14e041d3d50b85c689aef6d5f3319', 'Harperd'),
('Logan', 'Ramsey', 'e393429fc2718994855da77ba3b1aba67014972a28471b1fecb21fa2ba375e76', 'Ramseyl'),
('Peyton', 'Morris', 'ae087349bb953601482c9c52169257c0cb0371cbac3d921b5896a9aba8cc8a43', 'Morrisp'),
('Emerson', 'Clarke', '9faf9ee14d45246ab1c76cd60b5fb513a0975a5c04ad6d6f6bcb8bddc9b43105', 'Clarkee');



INSERT INTO Parking.Lots (LotName, LotType)
VALUES
('West Lot', 'A'),
('North-West Lot', 'A'),
('South Lot', 'B'),
('South-East Lot', 'B'),
('East Lot', 'C'),
('North-East Lot', 'C'),
('North Lot', 'D'),
('South-West Lot', 'W');



INSERT INTO Parking.Accessibility (PassType, LotType)
VALUES
('A', 'A'),

('B', 'A'),
('B', 'B'),

('C', 'A'),
('C', 'B'),
('C', 'C'),

('D', 'A'),
('D', 'B'),
('D', 'C'),
('D', 'D'),

('W', 'W');