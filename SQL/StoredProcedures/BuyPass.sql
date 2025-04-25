DROP PROCEDURE IF EXISTS Parking.CheckTicket;

GO

CREATE PROCEDURE Parking.CheckTicket
    @PersonID INT,
    @PassType VARCHAR(2)
    
AS
BEGIN
    INSERT INTO Parking.Passes (PassTypeYearID, PersonID, TimePurchased)
    SELECT pty.PassTypeYearID, @PersonID, SYSDATETIMEOFFSET()
    FROM Parking.PassTypeYears pty
    WHERE pty.YearOfValidity = YEAR(SYSDATETIME()) AND pty.PassType = @PassType
END;