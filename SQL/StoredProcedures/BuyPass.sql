DROP PROCEDURE IF EXISTS Parking.BuyPass;

GO

CREATE PROCEDURE Parking.BuyPass
    @LicensePlate VARCHAR(6),
    @StateCode CHAR(2),
    @PassType VARCHAR(2)
    
AS
BEGIN
    EXEC Parking.CreatePerson @LicensePlate = @LicensePlate, @StateCode = @StateCode;

    INSERT INTO Parking.Passes (PassTypeYearID, PersonID, TimePurchased)
    SELECT pty.PassTypeYearID, p.PersonID, SYSDATETIMEOFFSET()
    FROM Parking.PassTypeYears pty
        INNER JOIN Parking.People p ON p.LicensePlate = @LicensePlate
            AND P.StateCode = @StateCode
    WHERE pty.YearOfValidity = YEAR(SYSDATETIME()) AND pty.PassType = @PassType
END;