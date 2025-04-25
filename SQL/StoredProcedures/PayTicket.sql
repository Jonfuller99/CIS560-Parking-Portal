DROP PROCEDURE IF EXISTS Parking.PayTicket;

GO

CREATE PROCEDURE Parking.PayTicket
    @TicketID INT,
    @PersonID INT
AS
BEGIN
    UPDATE T
    SET T.TimePaid = SYSDATETIMEOFFSET()
    FROM Parking.Tickets T
    WHERE @TicketID = T.TicketID AND @PersonID = T.PersonID AND T.TimePaid IS NULL

    SELECT T.TimePaid
    FROM Parking.Tickets T
    WHERE @TicketID = T.TicketID AND @PersonID = T.PersonID AND T.TimePaid IS NOT NULL
END;

GO