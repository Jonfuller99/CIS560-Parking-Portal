DROP PROCEDURE IF EXISTS Parking.CheckTicket;

GO

CREATE PROCEDURE Parking.CheckTicket
    @LotName VARCHAR(50),
    @LicensePlate VARCHAR(6),
    @StateCode CHAR(2)
AS
BEGIN
    SELECT lty.LotTypeYearID, lty.Fee
    FROM Parking.Lots l
    JOIN Parking.LotTypeYears lty ON lty.LotType = l.LotType AND lty.YearOfValidity = YEAR(SYSDATETIME())
    WHERE l.LotName = @LotName

    EXCEPT

    SELECT lty.LotTypeYearID, lty.Fee
    FROM Parking.People p 
    JOIN Parking.Passes pa ON pa.PersonID = p.PersonID AND p.LicensePlate = @LicensePlate AND p.StateCode = @StateCode
    JOIN Parking.PassTypeYears pty ON pty.PassTypeYearID = pa.PassTypeYearID AND pty.YearOfValidity = YEAR(SYSDATETIME())
    JOIN Parking.Accessibility a ON a.PassType = pty.PassType
    JOIN Parking.LotTypeYears lty ON lty.LotType = a.LotType AND lty.YearOfValidity = YEAR(SYSDATETIME())
END;

GO

EXEC Parking.CheckTicket @LotName='West Lot', @LicensePlate='AYE123', @StateCode='KS';