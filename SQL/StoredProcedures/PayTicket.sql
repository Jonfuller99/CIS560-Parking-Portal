DROP PROCEDURE IF EXISTS Parking.PayTicket;

GO

CREATE PROCEDURE Parking.PayTicket
    @DateIssued DATE,
    @LotName VARCHAR(50),
    @PersonID INT
AS
BEGIN
    UPDATE T
    SET T.TimePaid = SYSDATETIMEOFFSET()
    FROM Parking.Tickets T
        INNER JOIN Parking.Lots L ON L.LotID = T.LotID
    WHERE @DateIssued = T.DateIssued AND @LotName = L.LotName AND @PersonID = T.PersonID AND T.TimePaid IS NULL

    SELECT T.TimePaid
    FROM Parking.Tickets T
        INNER JOIN Parking.Lots L ON L.LotID = T.LotID
    WHERE @DateIssued = T.DateIssued AND @LotName = L.LotName AND @PersonID = T.PersonID

END;

GO