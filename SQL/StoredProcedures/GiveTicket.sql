DROP PROCEDURE IF EXISTS Parking.GiveTicket;

GO

CREATE PROCEDURE Parking.GiveTicket
    @LotName VARCHAR(50),
    @LicensePlate VARCHAR(6),
    @StateCode CHAR(2),
    @OfficerID INT
AS
BEGIN
 IF EXISTS (
        SELECT 1
        FROM Parking.People p
        JOIN Parking.Lots l ON l.LotName = @LotName
        JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType
        WHERE p.StateCode = @StateCode 
          AND p.LicensePlate = @LicensePlate 
          AND lty.YearOfValidity = YEAR(SYSDATETIME())
    )
    BEGIN
        INSERT INTO Parking.Tickets (PersonID, OfficerID, LotID, TimeIssued, Fee)
        SELECT p.PersonID, @OfficerID, l.LotID, SYSDATETIMEOFFSET(), lty.Fee
        FROM Parking.People p 
        JOIN Parking.Lots l ON l.LotName = @LotName
        JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType
        WHERE p.StateCode = @StateCode AND p.LicensePlate = @LicensePlate AND lty.YearOfValidity = YEAR(SYSDATETIME())
    END
END;