DROP PROCEDURE IF EXISTS Parking.CreatePerson;

GO

CREATE PROCEDURE Parking.CreatePerson
    @LicensePlate VARCHAR(6),
    @StateCode CHAR(2)
AS
BEGIN
        INSERT INTO Parking.People (LicensePlate, StateCode)
        SELECT @LicensePlate, @StateCode
        WHERE NOT EXISTS
        (
            SELECT 1 FROM Parking.People p WHERE p.LicensePlate = @LicensePlate AND p.StateCode = @StateCode
        )
END;
