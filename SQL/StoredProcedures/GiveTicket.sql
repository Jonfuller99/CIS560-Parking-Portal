DROP PROCEDURE IF EXISTS Parking.GiveTicket;

GO

CREATE PROCEDURE Parking.GiveTicket
    @LotName VARCHAR(50),
    @LicensePlate VARCHAR(6),
    @StateCode CHAR(2),
    @OfficerID INT
AS
BEGIN
 IF NOT EXISTS (
        SELECT *
        FROM Parking.Tickets t
        JOIN Parking.People p ON p.PersonID = t.PersonID
        JOIN Parking.Lots l ON t.LotID = l.LotID
        WHERE p.StateCode = @StateCode 
          AND p.LicensePlate = @LicensePlate 
          AND DATEDIFF(DAY, t.TimeIssued, SYSDATETIME()) = 0
          AND l.LotName = @LotName
    )
    BEGIN
        INSERT INTO Parking.Tickets (PersonID, OfficerID, LotID, TimeIssued, Fee, LateCharge)
        SELECT p.PersonID, @OfficerID, l.LotID, SYSDATETIMEOFFSET(), lty.Fee, 0
        FROM Parking.People p 
        JOIN Parking.Lots l ON l.LotName = @LotName
        JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType
        WHERE p.StateCode = @StateCode AND p.LicensePlate = @LicensePlate AND lty.YearOfValidity = YEAR(SYSDATETIME())

        SELECT 1;
    END
END;

