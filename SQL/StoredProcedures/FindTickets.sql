DROP PROCEDURE IF EXISTS Parking.FindTickets;

GO

CREATE PROCEDURE Parking.FindTickets
    @PersonID INT
AS
BEGIN

    --late charge policy variables
    DECLARE @LateChargeInterval INT = 60;
    DECLARE @LateChargePercent INT = 20;

    --update late charges
    UPDATE T
    SET LateCharge = (DATEDIFF(DAY, T.TimeIssued, SYSDATETIMEOFFSET()) / @LateChargeInterval) * T.Fee * @LateChargePercent / 100
    FROM Parking.Tickets T
    WHERE T.PersonID = @PersonID
        AND DATEDIFF(DAY, T.TimeIssued, SYSDATETIMEOFFSET()) >= @LateChargeInterval
        AND T.TimePaid IS NULL;

    --select tickets for person
    SELECT L.LotName, L.LotType, T.TimeIssued, T.Fee, T.LateCharge, 
        (T.Fee + T.LateCharge) AS Total
    FROM Parking.Tickets T
        INNER JOIN Parking.Lots L ON T.LotID = L.LotID
    WHERE T.PersonID = @PersonID
        AND T.TimePaid IS NULL;
END;

GO
