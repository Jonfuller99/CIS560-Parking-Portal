DROP PROCEDURE IF EXISTS Parking.OfficerRank;

GO

CREATE PROCEDURE Parking.OfficerRank
    @Month INT,
    @Year INT
    
AS
BEGIN
    SELECT 
        RANK() OVER(ORDER BY SUM(ISNULL(T.Fee, 0) + ISNULL(T.LateCharge, 0)) DESC, COUNT(T.TicketID) DESC) AS OfficerRank,
        O.LastName,
        O.FirstName,
        COUNT(T.TicketID) AS TicketCount,
        SUM(ISNULL(T.Fee, 0) + ISNULL(T.LateCharge, 0)) AS TicketRevenue
    FROM Parking.Tickets T
        RIGHT JOIN Parking.Officers O ON O.OfficerID = T.OfficerID
            AND MONTH(T.TimeIssued) = @Month
            AND YEAR(T.TimeIssued) = @Year
    GROUP BY T.OfficerID, O.LastName, O.FirstName
    ORDER BY OfficerRank, LastName, FirstName
END;

GO

EXEC Parking.OfficerRank @Month = 4, @Year = 2025;